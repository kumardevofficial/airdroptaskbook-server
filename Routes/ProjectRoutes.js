import express from 'express';
import  {createProject, getAllProjects, updateProject,getProjectById}  from '../Controller/ProjectController.js';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post('/create-project', upload.single('projectImage'), createProject);
router.get('/all-project', getAllProjects);
router.put("/update-project/:id", updateProject);
router.get("/details/:id", getProjectById)


export default router;
