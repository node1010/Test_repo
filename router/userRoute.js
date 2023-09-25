const { register, loginUser, deleteUser, updateUser, logout, getUserProfile } = require("../controller/userController.js");
const { isAuthentication } = require("../middleWare/auth.js");
const upload = require("../middleWare/multer.js");

const router = require("express").Router();

router.post("/create", upload.any() ,register);
router.get("/get",isAuthentication, getUserProfile);
router.post("/login", loginUser);
router.get("/logout",isAuthentication, logout);
router.delete("/deleteOne", deleteUser);
router.put("/updateUser", upload.single('profile'), updateUser);

module.exports = router;
