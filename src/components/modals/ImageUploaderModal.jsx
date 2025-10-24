import React, { useState } from "react";
import { Plus, Camera } from "lucide-react";

const ImageUploaderModal = ({ isOpen, onClose, onImageSave }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleFileChange = (e, source) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create a preview URL for the selected image
        const imagePreview = URL.createObjectURL(file);


        // Update states
        setSelectedFile(file);
        setPreview(imagePreview);
    };



    const handleSave = () => {
        if (!selectedFile) {
            setErrorMessage("Please select an image first.");
            return;
        }
        if (!thumbnail.trim()) {
            setErrorMessage("Thumbnail description is required.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage = {
                id: Date.now(),
                url: reader.result, // store base64 version
                thumbnail: thumbnail.trim(),
            };
            onImageSave(newImage);
            // Reset
            setSelectedFile(null);
            setThumbnail("");
            setPreview("");
            onClose();
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Add Job Photo</h3>

                    {/* Image Upload Buttons */}
                    <div className="flex justify-center items-center gap-4 mb-4">
                        {/* Gallery Upload */}
                        <label className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "gallery")}
                                className="hidden"
                            />
                            <Plus className="w-6 h-6 text-gray-700" /> {/* Lucide Icon */}
                        </label>

                        {/* Camera Capture */}
                        <label className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={(e) => handleFileChange(e, "camera")}
                                className="hidden"
                            />
                            <Camera className="w-6 h-6 text-gray-700" /> {/* Lucide Icon */}
                        </label>
                    </div>


                    {/* Preview */}
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-96 object-cover rounded-lg mb-4 border"
                        />
                    )}

                    {/* Thumbnail Input */}
                    <label
                        htmlFor="thumbnail"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Add a thumbnail for image <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="thumbnail"
                        type="text"
                        value={thumbnail}
                        onChange={(e) => {
                            setThumbnail(e.target.value);
                            if (errorMessage) setErrorMessage("");
                        }}
                        placeholder="e.g., Final insulation layer in main room"
                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errorMessage ? "border-red-500" : "border-gray-300"
                            }`}
                    />

                    {errorMessage && (
                        <p className="text-red-600 text-xs mt-2">{errorMessage}</p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end mt-6 space-x-3">
                        <button
                            onClick={onClose}
                            className="text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploaderModal;