import { validateToken } from "../utils/token-utils.js";

// Middleware for authenticating requests.
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if(token && validateToken(token)){
        req.user = {name: "Raj" , id: 1};
        next();
    }
    else{
        res.status(401).send({
            message: 'Unauthorized'
        });
    }
}

export default authMiddleware;