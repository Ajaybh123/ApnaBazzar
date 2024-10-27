const jwt = require('jsonwebtoken');

const isAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        req.id = decode.userId;
        next(); 
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred during authentication",
            success: false
        });
    }
};

module.exports = {
    isAuthenticate,
};
