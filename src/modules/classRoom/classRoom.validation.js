const joi = require("joi");
const { name, school, building, floor, id } = {
  id: joi.string().hex().length(24),
  school: joi.string().hex().length(24),
  name: joi.string().min(2).max(100),
  building: joi.string().min(2).max(100),
  floor: joi.number().min(0).max(10)
};

const createClassRoomSchema = joi.object({
  name: name.required(),
  school: school,
  building: building.required(),
  floor: floor.required()
});

const updatedClassRoomSchema = joi.object({
  name: name,
  school: school,
  building: building,
  floor: floor,
  id: id.required()
});
const SpasificClassRoomSchema = joi.object({
  id: id.required()
});
const getAllclassRoomSchema = joi.object({
  schoolId: id
});
module.exports = {
  getAllclassRoomSchema,
  SpasificClassRoomSchema,
  updatedClassRoomSchema,
  createClassRoomSchema
};
