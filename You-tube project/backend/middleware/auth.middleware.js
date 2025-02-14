import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);

        req.user = decodedUser;

        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
}