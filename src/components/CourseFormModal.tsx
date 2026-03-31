import { use, useEffect } from "react";
import type { Category, CourseFormData } from "../types/cours";

type CourseFormModalProps = {
  isOpen: boolean;
  onClose: () => void;

  formdata: CourseFormData;

  categories: Category[];

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  setFormData?: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      price: number;
      category_id: number;
    }>
  >;

  mode?: "create" | "edit";

  initialData?: Partial<CourseFormData>;
};

function CourseFormModal({
  isOpen,
  onClose,
  formdata,
  categories,
  onSubmit,
  setFormData,
  mode = "create",
  initialData,
}: CourseFormModalProps) {

  useEffect(() => {
    if (!isOpen) return;

    // console.log("CourseFormModal opened with mode:", mode, "and initialData:", initialData);

    if (mode === "edit" && initialData) {
        setFormData && setFormData((prev) => ({
            ...prev,
            title: initialData.title ?? "",
            description: initialData.description ?? "",
            price: initialData.price ?? 0,
            category_id: initialData.category_id ?? 0,
        }));
    }

    if (mode === "create") {
        setFormData && setFormData(() => ({
            title : '', 
            description : '' , 
            price: 0 , 
            category_id: 0
        })) ; 
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Course
            {mode === "create" ? "Create Course" : "Edit Course"}
          </h2>
          <button onClick={onClose}>X</button>
        </div>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={formdata.title}
            onChange={(e) =>
              setFormData &&
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            name="title"
            placeholder="Course title"
            className="w-full border p-2 rounded mb-3"
          />

          <textarea
            value={formdata.description}
            onChange={(e) =>
              setFormData &&
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            name="description"
            placeholder="Course description"
            className="w-full border p-2 rounded mb-3"
          />

          <input
            type="number"
            value={formdata.price}
            onChange={(e) =>
              setFormData &&
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            name="price"
            placeholder="Course price"
            className="w-full border p-2 rounded mb-3"
          />

          <select
            value={formdata.category_id}
            onChange={(e) =>
              setFormData &&
              setFormData((prev) => ({
                ...prev,
                category_id: Number(e.target.value),
              }))
            }
            name="category_id"
            className="w-full border p-2 rounded mb-3"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {mode === "create" ? "Create" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseFormModal;
