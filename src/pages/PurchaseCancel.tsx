


function PurchaseCancel() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Purchase Canceled</h1>
            <p className="text-lg text-gray-700 mb-6">Your purchase was canceled. You can try again or explore other courses.</p>
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Go Back to Home</a>
        </div>
    );
}

export default PurchaseCancel;