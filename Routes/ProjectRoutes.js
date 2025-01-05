import express from 'express';
import  {createProject, getAllProjects}  from '../Controller/ProjectController.js';
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

export default router;
