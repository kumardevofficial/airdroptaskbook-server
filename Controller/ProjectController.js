import Project from "../Model/ProjectSchema.js";
import { uploadToCloudinary } from "../DbConnection/Cloudinary.js";
import cloudinary from 'cloudinary';



const createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectLink,
      xlink,
      discordLink,
      telegramLink,
      tasks,
    } = req.body;

    // Validate and handle image upload
    if (!req.file) {
      return res.status(400).json({ message: "Project image is required." });
    }

    // Upload image to Cloudinary (Assuming you have a separate function for this)
    const result = await uploadToCloudinary(req.file.path);

    if (!result || !result.url) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    }

    const projectImage = result.url; // Use the Cloudinary URL

    // Create a new project document
    const newProject = new Project({
      projectName,
      projectImage, // Save the Cloudinary image URL
      projectLink,
      xlink,
      discordLink,
      telegramLink,
      tasks: JSON.parse(tasks), // Parse tasks from JSON
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message: "Project created successfully.",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project.", error: error.message });
  }
};


 const getAllProjects = async (req, res) => {
      try {
        const projects = await Project.find();
        res.status(200).json(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects.", error });
      }
    }
  
    // Update a project by ID
    const updateProject = async (req, res) => {
      try {
        const { id } = req.params; 
        const updatedData = { ...req.body };
    
        // If a new image is provided, update the projectImage field
        if (req.file) {
          updatedData.projectImage = req.file.path;
        }
    
        // Parse tasks if provided as a string
        if (updatedData.tasks && typeof updatedData.tasks === "string") {
          updatedData.tasks = JSON.parse(updatedData.tasks);
        }
    
        // Remove undefined fields to only update provided data
        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key] === undefined || updatedData[key] === null) {
            delete updatedData[key];
          }
        });
    
        // Update the project
        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
          new: true, // Return the updated document
          runValidators: true, // Enforce schema validations
        });
    
        if (!updatedProject) {
          return res.status(404).json({ message: "Project not found." });
        }
    
        res.status(200).json({
          message: "Project updated successfully.",
          project: updatedProject,
        });
      } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Failed to update project.", error });
      }
    };
    
    

  //   // Get a single project by ID
  const getProjectById = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project.", error });
    }
  }


export  {createProject, getAllProjects, updateProject, getProjectById};


// const projectController = {
//   // Get all projects
//   getAllProjects: async (req, res) => {
//     try {
//       const projects = await Project.find();
//       res.status(200).json(projects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       res.status(500).json({ message: "Failed to fetch projects.", error });
//     }
//   },

//   // Get a single project by ID
//   getProjectById: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const project = await Project.findById(id);

//       if (!project) {
//         return res.status(404).json({ message: "Project not found." });
//       }

//       res.status(200).json(project);
//     } catch (error) {
//       console.error("Error fetching project:", error);
//       res.status(500).json({ message: "Failed to fetch project.", error });
//     }
//   },

//   // Update a project by ID
//   updateProject: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedData = req.body;

//       if (req.file) {
//         updatedData.projectImage = req.file.path; // Update image if a new file is uploaded
//       }

//       const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
//         new: true,
//         runValidators: true,
//       });

//       if (!updatedProject) {
//         return res.status(404).json({ message: "Project not found." });
//       }

//       res.status(200).json({
//         message: "Project updated successfully.",
//         project: updatedProject,
//       });
//     } catch (error) {
//       console.error("Error updating project:", error);
//       res.status(500).json({ message: "Failed to update project.", error });
//     }
//   },

//   // Delete a project by ID
//   deleteProject: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deletedProject = await Project.findByIdAndDelete(id);

//       if (!deletedProject) {
//         return res.status(404).json({ message: "Project not found." });
//       }

//       res.status(200).json({
//         message: "Project deleted successfully.",
//         project: deletedProject,
//       });
//     } catch (error) {
//       console.error("Error deleting project:", error);
//       res.status(500).json({ message: "Failed to delete project.", error });
//     }
//   },
// };

// module.exports = projectController;
