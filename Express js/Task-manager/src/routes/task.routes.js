import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addTask, deleteTask, getAllTasks, updateTask } from "../controller/task.controller.js";
import { validateTask } from "../middleware/validateTask.js";

const router = Router();

router.get('/', authMiddleware, getAllTasks);
router.post('/', authMiddleware, validateTask, addTask);
router.put('/:id', authMiddleware, validateTask, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;