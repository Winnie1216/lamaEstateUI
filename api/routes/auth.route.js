import { login, logout, register } from "../controllers/auth.controller.js";
import express from 'express'

const router = express.Router()
router.use(express.json());

router.post('/register', register
);
router.post('/login', login
);
router.post('/logout', logout
);
export default router