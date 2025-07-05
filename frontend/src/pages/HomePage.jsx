import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { toast } from "react-hot-toast";
import { FileText, PlusIcon } from "lucide-react";
import { Link } from "react-router";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      const data = await response.data;
      setNotes(data);
      setIsRateLimited(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Error fetching notes");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteDeleted = (deletedNoteId) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note._id !== deletedNoteId)
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetchNotes();
  }, []);

  if (isRateLimited) {
    return <RateLimitedUI />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-base-content">
                Loading notes...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-base-content mb-2">
                My Notes
              </h1>
            </div>
            {notes && notes.length === 0 ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="card bg-base-100 shadow-xl max-w-md w-full">
                  <div className="card-body text-center py-12">
                    <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-12 h-12 text-base-content/50" />
                    </div>
                    <h2 className="text-2xl font-bold text-base-content mb-2">
                      No notes yet
                    </h2>
                    <p className="text-base-content/70 mb-6">
                      Create your first note to get started
                    </p>
                    <Link
            to="/create"
            className="btn btn-primary rounded-full px-6 py-3 font-semibold text-black shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <PlusIcon size={15} className="stroke-4 text-black" />
            Create
          </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.map((note, index) => (
                  <NoteCard
                    key={note._id || index}
                    note={note}
                    onNoteDeleted={handleNoteDeleted} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
