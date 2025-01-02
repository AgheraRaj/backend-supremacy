import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle Es modules __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to log requests
const logMiddleware = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url} \n`;
    const logFile = path.join(__dirname, '../logs/request.log');

    fs.appendFile(logFile, log, (err) => {
        if (err) {
            console.error(err);
        }
    });

    next();
}

export default logMiddleware;