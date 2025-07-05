import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Calendar, Clock, Edit, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, onNoteDeleted }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${note._id}`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully!");
      setShowDeleteModal(false);
      onNoteDeleted?.(note._id);
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
      <div className="relative">
        <Link
          to={`/note/${note._id}`}
          className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer group block"
        >
          <div className="card-body p-6">
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEdit}
                className="btn btn-sm btn-ghost btn-circle bg-base-200/80 hover:bg-primary hover:text-white transition-all duration-200"
                title="Edit note"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="btn btn-sm btn-ghost btn-circle bg-base-200/80 hover:bg-error hover:text-white transition-all duration-200"
                title="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="card-title text-lg font-bold text-base-content mb-3 line-clamp-2 group-hover:text-primary transition-colors pr-20">
              {note.title || "Untitled Note"}
            </h3>

            <div className="text-base-content/70 text-sm mb-4 line-clamp-4">
              {truncateText(note.content || "No content available")}
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-base-300">
              <div className="flex items-center gap-2 text-xs text-base-content/60">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(note.createdAt || note.dateCreated)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-base-content/60">
                <Clock className="w-4 h-4" />
                <span>{formatTime(note.createdAt || note.dateCreated)}</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </Link>
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
                  {note.title || "Untitled Note"}
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

export default NoteCard;
