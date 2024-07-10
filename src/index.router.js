const { AppError } = require("../utilities/AppError.js");
const teacherRouter = require("./modules/teacher/teacher.router.js");
const classRoomRouter = require("./modules/classRoom/classRoom.router.js");
const schoolRouter = require("./modules/school/school.router.js");
const StudentRouter = require("./modules/student/student.router.js");

function init(app) {
  app.use("/api/teacher", teacherRouter);
  app.use("/api/classRoom", classRoomRouter);
  app.use("/api/school", schoolRouter);
  app.use("/api/student", StudentRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
  });
}

module.exports = { init };
