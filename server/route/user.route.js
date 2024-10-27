const userRouter = require('express').Router();
const { login, logout, register, updateProfile } = require('../controllers/user.controller');
const { isAuthenticate } = require('../middlerware/isAuthenticate');

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.put("/update-profile", isAuthenticate, updateProfile);

module.exports = userRouter;