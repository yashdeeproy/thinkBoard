import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getNoteById = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Input validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    if (title.length > 200) {
      return res.status(400).json({ message: "Title must be less than 200 characters" });
    }
    
    if (content.length > 10000) {
      return res.status(400).json({ message: "Content must be less than 10,000 characters" });
    }
    
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    
    // Input validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    if (title.length > 200) {
      return res.status(400).json({ message: "Title must be less than 200 characters" });
    }
    
    if (content.length > 10000) {
      return res.status(400).json({ message: "Content must be less than 10,000 characters" });
    }
    
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
