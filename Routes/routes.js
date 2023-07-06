const express = require("express");
const router = new express.Router();

const controllers = require("../Controllers/userController");
const upload = require("../MulterConfig/storageConfig");

router.post(
  "/user/register",
  upload.single("user_profile"),
  controllers.userPost
);

router.get("/user/details", controllers.getUser);

router.get("/user/:id", controllers.getSingleUser);

router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  controllers.editUser
);

router.put("/user/status/:id", controllers.userStatusChange);

module.exports = router;
