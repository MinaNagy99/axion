const express = require('express');
const Student = require("./student.controller.js");
const { allowedTo, auth, authorization } = require("../../../middlewares/auth.js");
const { validation } = require("../../../middlewares/validation.js");
const {
  createStudentSchema,
  getAllStudentSchema,
  SpasificStudnetSchema,
  updatedStudentSchema
} = require("./student.validation.js");
const { uploadMixfile } = require('../../../middlewares/fileUpload.js');
const upladeToCloudnairy = require('../../../middlewares/uploadToCloud.js');

const StudentRouter = express.Router(); // Use express.Router() to create a router instance

StudentRouter.route("/")
  .get(
    auth,
    allowedTo("admin", "superAdmin"),
    validation(getAllStudentSchema),
    Student.getAllStudent
  )
  .post(
    auth,
    allowedTo("superAdmin", "admin"),
    uploadMixfile([{ name: "avatar", maxCount: 1 }]),
    upladeToCloudnairy,
    validation(createStudentSchema),
    Student.createStudent
  );

StudentRouter.route("/:id")

  .delete(
    auth,
    allowedTo("superAdmin", "admin"),
    authorization("student"),
    validation(SpasificStudnetSchema),
    Student.deletestudent
  )
  .patch(
    auth,
    allowedTo("superAdmin", "admin"),
    authorization("student"),
    uploadMixfile([{ name: "avatar", maxCount: 1 }]),
    upladeToCloudnairy,
    validation(updatedStudentSchema),
    Student.updatestudent
  );

  module.exports = StudentRouter;
