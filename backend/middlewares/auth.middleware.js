import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided. \n Please login again" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user information to the request object
        req.user = {
            studentId: decoded.studentId,
            email: decoded.email,
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token. \n Please login again" });
    }
};

export default authenticateUser;