const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
});
taskSchema.pre("save", async function (next) {
  const task = this;
  if (task) next();
});

const Task = mongoose.model("Task", taskSchema);

// const newTask = new Task({ description: "Build an Empire   " });

// newTask
//   .save()
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((error) => console.log(error));

module.exports = Task;
