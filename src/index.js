const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const myFunction = async () => {
  const token = jwt.sign({ _id: "abs23" }, "thisismyfirsttoken", {
    expiresIn: "1 seconds",
  });
  console.log(token);
  const data = jwt.verify(token, "thisismyfirsttoken");
  console.log(data);
};

//myFunction();
