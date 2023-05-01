const express = require("express");
const noteRouter = express.Router();
const { noteModel } = require("../model/note.model");

// Create a new note
noteRouter.post("/create", async (req, res) => {
  try {
    const note = new noteModel(req.body);
    await note.save();
    res.status(201).send({ message: "Note added successfully", note });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Get all notes
noteRouter.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const notes = await noteModel.find({ authorId: req.body.authorId });
    res.status(200).send({ notes });
  } catch (error) {
    res.status(400).send({ error });
  }
});

noteRouter.get("/:id", async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ note });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Delete a note by ID
noteRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const note = await noteModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== note.authorId) {
      res.send({ msg: "You are not authorize to change this" });
    } else {
      const note = await noteModel.findByIdAndDelete(id);
      res.status(200).send({ message: "Note deleted successfully", note });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Update a note by ID
noteRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const note = await noteModel.findOne({ _id: id });

  console.log();
  try {
    if (req.body.authorId !== note.authorId) {
      res.send({ msg: "You are not authorize to change this" });
    } else {
      const note = await noteModel.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "Note updated successfully", note });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = { noteRouter };
