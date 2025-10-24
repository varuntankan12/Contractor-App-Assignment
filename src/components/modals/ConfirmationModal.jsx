
const ConfirmationModal = ({ isOpen, title = "Confirm", message, onCancel, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <div className="flex justify-center gap-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-100">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;