const express = require("express");
const teacher = require("./teacher.controller.js");
const {
  spasificTeacherSchema,
  teacherSchemaCreate,
  teacherSchemaLogin,
  teacherSchemaUpdate
} = require("./teacher.validation.js");
const { allowedTo, auth } = require("../../../middlewares/auth.js");
const { validation } = require("../../../middlewares/validation.js");
const { uploadMixfile } = require("../../../middlewares/fileUpload.js");
const upladeToCloudnairy = require("../../../middlewares/uploadToCloud.js");

const teacherRouter = express.Router();
teacherRouter
  .route("/register")
  .post(
    auth,
    allowedTo("superAdmin"),
    uploadMixfile([{ name: "avatar", maxCount: 1 }]),
    upladeToCloudnairy,
    validation(teacherSchemaCreate),
    teacher.register
  );

teacherRouter
  .route("/login")
  .post(validation(teacherSchemaLogin), teacher.login);

teacherRouter
  .route("/")
  .get(auth, allowedTo("superAdmin"), teacher.getAllteachers);

teacherRouter.route("/profile").get(auth, teacher.getTeacherProfile);

teacherRouter
  .route("/:id")
  .get(
    auth,
    allowedTo("superAdmin"),
    validation(spasificTeacherSchema),
    teacher.getTeacherById
  )
  .patch(
    auth,
    allowedTo("superAdmin"),
    uploadMixfile([{ name: "avatar", maxCount: 1 }]),
    upladeToCloudnairy,
    validation(teacherSchemaUpdate),
    teacher.updateTeacherProfile
  );

module.exports = teacherRouter;
