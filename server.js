const DbConnection = require("./DataBase/DbConnection.js").default;
const morgan = require("morgan");

const dotenv = require("dotenv");
const { init } = require("./src/index.router.js");
const express = require("express");
const { customErrorHandler } = require("./middlewares/customErrorHandler.js");
const app = express();

DbConnection;

dotenv.config();

app.use(morgan("combined"));
app.use(express.json());
init(app);

app.use(customErrorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
