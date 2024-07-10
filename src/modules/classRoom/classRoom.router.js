const classRoom = require("./classRoom.controller.js");
const express = require("express");

const {
  allowedTo,
  auth,
  authorization
} = require("../../../middlewares/auth.js");

const { validation } = require("../../../middlewares/validation.js");
const {
  createClassRoomSchema,
  getAllclassRoomSchema,
  SpasificClassRoomSchema,
  updatedClassRoomSchema
} = require("./classRoom.validation.js");
const classRoomRouter = express.Router();

classRoomRouter
  .route("/")
  .get(
    auth,
    allowedTo("admin", "superAdmin"),
    validation(getAllclassRoomSchema),
    classRoom.getAllclassRoom
  )
  .post(
    auth,
    allowedTo("superAdmin", "admin"),

    validation(createClassRoomSchema),
    classRoom.createclassRoom
  );

classRoomRouter
  .route("/:id")

  .delete(
    auth,
    allowedTo("superAdmin", "admin"),
    authorization("classRoom"),
    validation(SpasificClassRoomSchema),
    classRoom.deleteclassRoom
  )
  .patch(
    auth,
    allowedTo("superAdmin", "admin"),
    authorization("classRoom"),
    validation(updatedClassRoomSchema),
    classRoom.updateclassRoom
  );

module.exports = classRoomRouter;
