const express = require("express");
const school = require("./school.controller.js");
const { allowedTo, auth } = require("../../../middlewares/auth.js");
const { validation } = require("../../../middlewares/validation.js");
const {
  createSchoolSchema,
  SpasificSchoolSchema,
  updatedSchoolSchema
} = require("./school.validation.js");
const upladeToCloudnairy = require("../../../middlewares/uploadToCloud.js");
const { uploadMixfile } = require("../../../middlewares/fileUpload.js");
const schoolRouter = express.Router();

schoolRouter
  .route("/")
  .get(school.getAllschool)
  .post(
    auth,
    allowedTo("superAdmin"),
    uploadMixfile([{ name: "image", maxCount: 1 }]),
    upladeToCloudnairy,
    validation(createSchoolSchema),
    school.createschool
  );

schoolRouter
  .route("/:id")
  .get(validation(SpasificSchoolSchema), school.getschoolById)
  .delete(
    auth,
    allowedTo("superAdmin"),
    validation(SpasificSchoolSchema),
    school.deleteschool
  )
  .patch(
    auth,
    allowedTo("superAdmin"),
    uploadMixfile([{ name: "image", maxCount: 1 }]),
    upladeToCloudnairy,
    validation(updatedSchoolSchema),
    school.updateschool
  );

module.exports = schoolRouter;
