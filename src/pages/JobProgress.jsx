import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckSquare, ImagePlus, Save, CheckCircle2, Trash2, Plus, Camera } from "lucide-react";
import { formatDateTime } from "../statics/FormatDateTime";
import ImageUploaderModal from "../components/modals/ImageUploaderModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";


const MIN_IMAGES_REQUIRED = 3;

const defaultChecklist = [
    { id: 1, label: "All insulation batts installed correctly.", checked: false },
    { id: 2, label: "Vapor barriers properly positioned.", checked: false },
    { id: 3, label: "No gaps or compression in insulation.", checked: false },
    { id: 4, label: "Ventilation clearances maintained.", checked: false },
    { id: 5, label: "Work area cleaned and debris removed.", checked: false },
];



const JobProgressPage = ({ jobs, setJobs, inProgressData, setInProgressData }) => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);

    // local progress state for this job
    const [progressState, setProgressState] = useState(() => {
        const saved = localStorage.getItem(`progress-${jobId}`);
        return saved ? JSON.parse(saved) : inProgressData[jobId] || { progressChecklist: defaultChecklist, comments: "", images: [] };
    });

    // messages & modal state
    const [message, setMessage] = useState("");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // if job missing or not in-progress, show a helpful screen
    if (!job) {
        return (
            <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center text-gray-600">
                <p className="mb-4">Job not found for id: <span className="font-mono">{jobId}</span></p>
                <button onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Back to dashboard</button>
            </div>
        );
    }

    useEffect(() => {
        localStorage.setItem(`progress-${jobId}`, JSON.stringify(progressState));
    }, [progressState, jobId]);

    // keep inProgressData updated to parent if local state changes and user saves
    const handleSaveProgress = () => {
        setInProgressData((prev) => ({ ...prev, [jobId]: progressState }));
        setMessage("Progress saved");
        setTimeout(() => setMessage(""), 2000);
    };

    const handleToggleChecklist = (id) => {
        setProgressState((prev) => ({
            ...prev,
            progressChecklist: prev.progressChecklist.map((it) =>
                it.id === id ? { ...it, checked: !it.checked } : it
            ),
        }));
    };

    const handleImageSave = (newImage) => {
        setProgressState((prev) => ({
            ...prev,
            images: [...prev.images, newImage],
        }));
    };

    const handleImageDelete = (id) => {
        setProgressState((prev) => ({
            ...prev,
            images: prev.images.filter((img) => img.id !== id),
        }));
    };

    const handleMarkAsCompleted = () => {
        if ((progressState.images?.length || 0) < MIN_IMAGES_REQUIRED) {
            setMessage(`Please upload at least ${MIN_IMAGES_REQUIRED} images before completion.`);
            return;
        }
        setIsConfirmOpen(true);
    };

    const confirmCompletion = () => {
        // 1. update main jobs list
        setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "completed", endTime: new Date().toISOString() } : j)));
        // 2. persist progress state
        setInProgressData((prev) => ({ ...prev, [jobId]: progressState }));
        // 3. close modal and navigate
        setIsConfirmOpen(false);
        navigate("/dashboard");
    };

    // small UI helpers
    const imagesCount = progressState.images?.length || 0;
    const completionDateDisplay = job.endTime ? formatDateTime(job.endTime) : "--/--/----";

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50 p-6 md:py-20 md:p-10 py-20">
            {/* Top bar / header */}
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Job Progress</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-xs text-gray-500">Job ID</div>
                            <div className="font-mono text-sm text-gray-800">{job.id}</div>
                        </div>
                        <button onClick={handleSaveProgress} title="Save progress" className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow hover:bg-black">
                            <Save className="w-4 h-4" /> Save
                        </button>
                    </div>
                </div>

                {/* Main layout: left - details, right - progress card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left column: job details */}
                    <aside className="md:col-span-1 bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{job.address}</p>

                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                            <div><span className="font-semibold">Requested:</span> {formatDateTime(job.startTime)}</div>
                            <div><span className="font-semibold">Completion:</span> {completionDateDisplay}</div>
                            <div><span className="font-semibold">Area:</span> {job.size} m²</div>
                            <div><span className="font-semibold">Status:</span> <span className={`ml-2 inline-block px-2 py-1 rounded text-xs ${job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : job.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{job.status}</span></div>
                        </div>


                    </aside>

                    {/* Right column: big card with checklist, images, comments */}
                    <section className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2"><CheckSquare className="w-5 h-5 text-green-500" /> Progress Checklist</h3>

                            </div>

                            {/* Checklist */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {progressState.progressChecklist.map((item) => (
                                    <label key={item.id} className="flex items-start gap-3 p-2 rounded-lg  hover:bg-gray-50">
                                        <input type="checkbox" checked={item.checked} onChange={() => handleToggleChecklist(item.id)} className="mt-1 h-3 w-3 accent-gray-500" />
                                        <div className="text-sm text-gray-700">{item.label}</div>
                                    </label>
                                ))}
                            </div>

                            {/* Images area */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-800">Job Photos</h4>
                                    <div className="text-sm text-gray-500">{imagesCount} uploaded</div>
                                </div>

                                <div className="min-h-[110px] p-3 border border-gray-100 rounded-lg flex flex-wrap gap-3">
                                    {progressState.images && progressState.images.length > 0 ? (
                                        progressState.images.map((img) => (
                                            <div key={img.id} className="relative w-28 h-20 rounded overflow-hidden border">
                                                <img src={img.url} alt={img.thumbnail || "job"} className="w-full h-full object-cover" />
                                                <button onClick={() => handleImageDelete(img.id)} title="Delete" className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full p-1 transition">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                                {/* <div className="absolute left-1 bottom-1 bg-black/60 text-xs text-white px-1 rounded">{img.thumbnail || "Photo"}</div> */}
                                                <p className="text-xs text-gray-600 mt-1 truncate" title={img.thumbnail}>
                                                    {img.thumbnail}
                                                </p>
                                            </div>

                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-400">No photos yet. Add images to document progress.</div>
                                    )}

                                    {/* Add photo tile */}
                                    <button onClick={() => setIsImageModalOpen(true)} className="w-28 h-20 flex flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600">
                                        <ImagePlus className="w-6 h-6" />
                                        <span className="text-xs mt-1">Add</span>
                                    </button>
                                </div>
                                {/* <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick actions</h3>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => setIsImageModalOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 hover:border-blue-500">
                                            <ImagePlus className="w-4 h-4 text-blue-600" /> Add Photo
                                        </button>
                                        <button onClick={() => navigate("/dashboard")} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Back to dashboard</button>
                                    </div>
                                </div> */}
                            </div>

                            {/* Comments */}
                            <div className="mt-6">
                                <h4 className="font-medium text-gray-800 mb-2">Comments / Notes</h4>
                                <textarea
                                    value={progressState.comments}
                                    onChange={(e) => setProgressState((prev) => ({ ...prev, comments: e.target.value }))}
                                    rows={4}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
                                    placeholder="Add notes about issues, materials, or next steps..."
                                />
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3">
                                <div>
                                    {message && <div className="text-sm text-blue-600 font-medium">{message}</div>}
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={handleSaveProgress} className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg">
                                        <Save className="w-4 h-4" /> Save Progress
                                    </button>
                                    <button onClick={handleMarkAsCompleted} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4" /> Mark as Completed
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Optional smaller card: summary / tips */}
                        <div className="bg-white rounded-xl shadow p-4 text-sm text-gray-700">
                            <p className="font-semibold mb-2">Completion requirements</p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Upload at least {MIN_IMAGES_REQUIRED} images.</li>
                                <li>Complete necessary checklist items.</li>
                                <li>Save progress periodically to avoid data loss.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

            {/* Modals */}
            <ImageUploaderModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                onImageSave={handleImageSave}
            />
            <ConfirmationModal isOpen={isConfirmOpen} title="Confirm Completion" message="Are you sure you want to mark this job as completed? This action cannot be undone." onConfirm={confirmCompletion} onCancel={() => setIsConfirmOpen(false)} />
        </div>
    );
};

export default JobProgressPage;