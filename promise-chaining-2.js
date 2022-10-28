require("./src/db/mongoose");
//const User = require("src/models/user.js");
const Task = require("./src/models/task");

// Task.findByIdAndDelete("633698e732a123cbf2d097e5")
//   .then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((tasks) => {
//     console.log(tasks);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("63361d97cc8a3d56e863bd25")
  .then((value) => {
    console.log(value);
  })
  .catch((e) => {
    console.log(e);
  });
