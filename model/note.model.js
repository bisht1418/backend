const { Schema, model } = require("mongoose");

const noteSchema = Schema(
  {
    title: { type: String },
    body: { type: String },
    name: { type: String },
    description: { type: String },
    authorId: { type: String },
    author: { type: String },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("note", noteSchema);

module.exports = { noteModel };
