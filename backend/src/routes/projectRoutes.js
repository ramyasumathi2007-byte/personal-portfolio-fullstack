import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) { next(error); }
});

export default router;
