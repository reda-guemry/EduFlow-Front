import { useEffect, useState } from "react";
import { useAuth } from "../customhook/useAuth";
import { fetchProfile, getCategories } from "../services/profile";
// import { updateProfile } from "../services/profile";

function Profile() {
  const { accessToken, setAccessToken, setUser, handleAuthError } = useAuth();

  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [categorie, setCategorie] = useState([]);
  const [ interestCategories, setInterestCategories] = useState<number[]>([]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProfile(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
      );

      const data = response.data || response;
      setUserDetails(data);

      setInterestCategories(data.interests.map((cat: any) => cat.id) || []);


      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await getCategories(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
      );
      setCategorie(response.data);
    } catch (error) {
      console.error("Error in fetchAllCategories:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchAllCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Les données à envoyer :", formData);

      // await updateProfile(accessToken, formData);

      setUserDetails({ ...userDetails, ...formData });
      setIsEditing(false);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-gray-600 font-medium">
        Chargement du profil...
      </div>
    );
  }

    //   console.log(interestCategories);


  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mon Profil</h1>

      {userDetails ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center justify-between border-b pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold uppercase">
                {userDetails.first_name?.charAt(0)}
                {userDetails.last_name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 capitalize">
                  {userDetails.first_name} {userDetails.last_name}
                </h2>
                <p className="text-gray-500 text-sm capitalize">
                  {userDetails.role}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isEditing
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {isEditing ? "Annuler" : "Modifier le profil"}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Adresse Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-gray-500"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">
                  L'adresse e-mail ne peut pas être modifiée pour des raisons de
                  sécurité.
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md shadow-blue-500/30"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          ) : (
            // 🔵 Mode Affichage (ReadOnly)
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Nom complet
                  </p>
                  <p className="text-lg text-gray-900 font-semibold capitalize">
                    {userDetails.first_name} {userDetails.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Adresse Email
                  </p>
                  <p className="text-lg text-gray-900 font-semibold">
                    {userDetails.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Date d'inscription
                  </p>
                  <p className="text-lg text-gray-900 font-semibold">
                    {userDetails.created_at
                      ? new Date(userDetails.created_at).toLocaleDateString(
                          "fr-FR",
                        )
                      : "Non disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Rôle</p>
                  <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                    {userDetails.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          {categorie && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Catégories disponibles
              </h3>
              <div className="grid grid-cols-3 gap-4 ">
                {categorie.map((cat: any) => (
                  <div
                    key={cat.id}
                className={`bg-gray-50 rounded-lg p-4 border ${ 
                        interestCategories.includes(cat.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    } `}
                  >
                    <h4 className="text-md font-semibold text-gray-700">
                      {cat.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg font-medium border border-red-100">
          Utilisateur introuvable.
        </div>
      )}
    </div>
  );
}

export default Profile;
