import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  taskLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\//i.test(v);
      },
      message: "Invalid task link. It must start with http:// or https://",
    },
  },
  taskDescription: {
    type: String,
    trim: true,
  },
});

const projectSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectImage: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\//i.test(v);
      },
      message: "Invalid project link. It must start with http:// or https://",
    },
  },
  xlink: {
    type: String,
    trim: true,
  },
  discordLink: {
    type: String,
    trim: true,
  },
  telegramLink: {
    type: String,
    trim: true,
  },
  tasks: [taskSchema],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
