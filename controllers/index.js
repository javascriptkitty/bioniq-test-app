const Task = require("../models").Task;
const io = require("../io")();

module.exports = {
  findAll: function (req, res) {
    Task.find()
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    Task.findOne({ _id: req.params.id })
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  //TODO
  create: function (req, res) {
    Task.create(req.body)
      .then((dbModel) => {
        io.emit("task", dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  //TODO
  bulkDelete: function (req, res) {
    const { priority, op } = req.params;
    const filter = { priority: { $gte: priority } };
    Task.deleteMany(filter)
      .then((result) => {
        res.json({ ...req.params });
      })
      .catch((err) => res.status(422).json(err));
  },

  remove: function (req, res) {
    console.log(req.params);
    Task.deleteOne(req.params.id)
      //.then((dbModel) => dbModel.remove())
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },
};
