const classRoomModel = require("../DataBase/models/classRoomModel.js");
const studentModel = require("../DataBase/models/studentModel.js");
const teacherModel = require("../DataBase/models/teacherModel.js");
const { AppError } = require("../utilities/AppError.js");
const { catchAsyncError } = require("./catchAsyncError.js");
const jwt = require("jsonwebtoken");
const auth = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token not provider", 401));
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) return next(new AppError(err.message));
    const { id } = decoded;
    const teacher = await teacherModel.findById(id).select("-password");
    if (!teacher) return next(new AppError("teacher not authorized", 401));

    req.teacher = teacher;
    next();
  });
});

const allowedTo = (...role) => {
  return catchAsyncError(async (req, res, next) => {
    if (!role.includes(req.teacher.role))
      return next(
        new AppError(`you are not authorized you are ${req.teacher.role}`, 401)
      );

    next();
  });
};

const authorization = (model) => {
  return catchAsyncError(async (req, res, next) => {
    if (model == "classRoom") {
      const { id } = req.params;
      const { role, school } = req.teacher;
      const classRoom = await classRoomModel.findById(id);

      const isAuthorized =
        (role === "admin" && classRoom.school === school) ||
        role === "superAdmin";

      if (!isAuthorized) {
        return next(
          new AppError("You are not authorized to access this resource", 403)
        );
      } else {
        next();
      }
    }
    if (model == "student") {
      const { id } = req.params;
      const { role, school } = req.teacher;
      const student = await studentModel.findById(id);

      const isAuthorized =
        (role === "admin" && student.school === school) ||
        role === "superAdmin";

      if (!isAuthorized) {
        return next(
          new AppError("You are not authorized to access this resource", 403)
        );
      } else {
        next();
      }
    }
  });
};

module.exports = { auth, allowedTo, authorization };
