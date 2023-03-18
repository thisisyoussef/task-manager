const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET /tasks?completed=true
// Get /tasks?limit=10&skip=0
// Get /tasks?sortBy=createdAt:desc
// GET /tasks?sortBy=createdAt:asc
router.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    const options = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
    }
    if (req.query.limit) {
      options.limit = parseInt(req.query.limit);
    }
    if (req.query.skip) {
      options.skip = parseInt(req.query.skip);
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      options.sort = {
        [parts[0]]: parts[1] === "desc" ? -1 : 1,
      };
    }

    //const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate({
      path: "tasks",
      match,
      options: options,
    });
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ owner: req.user._id, _id });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ owner: req.user._id, _id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ owner: req.user._id, _id });
    if (!task) {
      return res.status(404).send("No task found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
