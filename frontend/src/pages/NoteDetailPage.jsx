import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AlertCircle, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import api from '../lib/axios';

const NoteDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${id}`);
                setNote(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching note:', error);
                if (error.response?.status === 404) {
                    setError('Note not found');
                    toast.error('Note not found');
                } else if (error.response?.status === 429) {
                    setError('Too many requests. Please try again later.');
                    toast.error('Rate limit exceeded');
                } else {
                    setError('Failed to load note');
                    toast.error('Failed to load note');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchNote();
        } else {
            setError('Invalid note ID');
            setIsLoading(false);
        }
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleEdit = () => {
        navigate(`/edit/${note._id}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            await api.delete(`/notes/${note._id}`);
            toast.success("Note deleted successfully!");
            setShowDeleteModal(false);
            navigate('/'); // Navigate back to homepage after deletion
        } catch (error) {
            console.error("Error deleting note:", error);
            if (error.response?.status === 429) {
                toast.error("Too many requests. Please try again later.");
            } else {
                toast.error("Failed to delete note. Please try again.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <Navbar />
                
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <BackButton />

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-lg font-semibold text-base-content">
                                    Loading note...
                                </p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-12 h-12 text-error" />
                            </div>
                            <h2 className="text-2xl font-bold text-base-content mb-2">
                                {error}
                            </h2>
                            <p className="text-base-content/70 mb-6">
                                The note you're looking for doesn't exist or couldn't be loaded.
                            </p>
                            <BackButton />
                        </div>
                    ) : note ? (
                        <div className="max-w-4xl mx-auto">
                            <div className="card bg-base-100 shadow-xl relative">
                                {/* Action Buttons */}
                                <div className="absolute top-6 right-6 flex gap-2">
                                    <button
                                        onClick={handleEdit}
                                        className="btn btn-sm btn-circle bg-base-200 hover:bg-primary hover:text-white transition-all duration-200"
                                        title="Edit note"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="btn btn-sm btn-circle bg-base-200 hover:bg-error hover:text-white transition-all duration-200"
                                        title="Delete note"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="card-body p-8 pr-20">
                                    <h1 className="text-4xl font-bold text-base-content mb-4">
                                        {note.title || "Untitled Note"}
                                    </h1>
                                    
                                    <div className="text-sm text-base-content/60 mb-6">
                                        Created: {formatDate(note.createdAt || note.dateCreated)}
                                    </div>
                                    
                                    <div className="prose max-w-none">
                                        <p className="text-base-content text-lg leading-relaxed whitespace-pre-wrap">
                                            {note.content || "No content available"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-bold text-base-content mb-2">
                                Note not found
                            </h2>
                            <BackButton />
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-base-100 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-error/20 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-error" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-base-content">
                                    Delete Note
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-base-content/80 mb-2">
                                Are you sure you want to delete this note?
                            </p>
                            <div className="bg-base-200 rounded-lg p-3">
                                <p className="font-semibold text-sm text-base-content truncate">
                                    {note?.title || "Untitled Note"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDeleteCancel}
                                className="btn btn-outline flex-1"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className={`btn btn-error text-white flex-1 ${
                                    isDeleting ? "loading" : ""
                                }`}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteDetailPage;
