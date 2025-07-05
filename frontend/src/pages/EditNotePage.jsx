import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PencilIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import BackButton from "../components/BackButton";
import api from "../lib/axios";

const EditNotePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await api.get(`/notes/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch note");
      setIsLoading(false);
    }
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }
    
    if (title.length > 200) {
      toast.error("Title must be less than 200 characters");
      return;
    }
    
    if (content.length > 10000) {
      toast.error("Content must be less than 10,000 characters");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await api.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });
      toast.success("Note updated successfully");
      navigate("/");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update note");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out w-full max-w-2xl">
          <div className="card-body p-8">
            <BackButton />
            <h1 className="text-3xl font-bold text-base-content mb-6 text-center">
              Edit Note
            </h1>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-lg font-semibold text-base-content">
                    Loading note...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="label">
                    <span className="font-semibold text-base-content">
                      Title
                    </span>
                    <span className={`text-sm ${title.length > 200 ? 'text-error' : 'text-base-content/60'}`}>
                      {title.length}/200
                    </span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className={`input input-bordered w-full ${title.length > 200 ? 'input-error' : ''}`}
                    placeholder="Enter note title..."
                  />
                </div>
                <div>
                  <label htmlFor="content" className="label">
                    <span className="font-semibold text-base-content">
                      Content
                    </span>
                    <span className={`text-sm ${content.length > 10000 ? 'text-error' : 'text-base-content/60'}`}>
                      {content.length}/10,000
                    </span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    className={`textarea textarea-bordered w-full h-64 resize-none ${content.length > 10000 ? 'textarea-error' : ''}`}
                    placeholder="Write your note content here..."
                  />
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="btn btn-primary rounded-full px-6 py-3 font-semibold text-black shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
                  >
                    <PencilIcon size={15} className="stroke-4 text-black" />
                    Edit Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNotePage;
