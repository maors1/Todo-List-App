var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs(
  "mongodb://maor:12345@ds247027.mlab.com:47027/mytaskslist_mean_sapsap",
  ["tasks"]
);

//Get all tasks
router.get("/tasks", function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

//Get single task
router.get("/task/:id", function(req, res, next) {
  db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Save Task
router.post("/task", function(req, res, next) {
  var task = req.body;
  console.log(task);
  if (!(task.title && task.isDone)) {
    res.status(400);
    res.json({
      error: "Bad data"
    });
  } else {
    db.tasks.save(task, function(err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

//Delete Task
router.delete("/task/:id", function(req, res, next) {
  db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(task);
      //   res.json({"d1": task , "d2": id });
    }
  });
});

//Update Task
router.put("/task/:id", function(req, res, next) {
  var task = req.body;
  // console.log(task);
  
  if (!(task.title && (task.isDone === true || task.isDone === false ) )) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    // console.log(task);
    db.tasks.update({ _id: mongojs.ObjectId(task._id) }, { title: task.title, isDone: task.isDone}, function(
      err,
      task
    ) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

module.exports = router;
