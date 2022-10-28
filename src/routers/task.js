const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    // const task = await Task.findByIdAndUpdate(id, req.body, {
    //   runValidators: true,
    //   new: true,
    // });
    
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id, req.body);
    if (!task) {
      return res.status(404).send("No task found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
