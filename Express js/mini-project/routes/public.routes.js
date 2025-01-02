import express from 'express';
import { generateToken } from '../utils/token-utils.js';

const router = express.Router();

router.get('/generate-token', (req, res) => {
    const token = generateToken();
    res.status(200).send({
        message: 'Token generated successfully please save it for future reference',
        token: token 
    });
});

router.get('/' , (req, res) => {
    res.status(200).send({
        message: 'Welcome to the Home Page'
    });
});

export default router;