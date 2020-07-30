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

  create: function (req, res) {
    Task.create(req.body)
      .then((dbModel) => {
        io.emit("task", dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  bulkDelete: function (req, res) {
    const { priority, op } = req.query;

    let filter;
    if (priority) {
      let param =
        op === "gt" ? { $gt: parseInt(priority) } : { $lt: parseInt(priority) };

      filter = { priority: param };
    } else {
      filter = { name: { $eq: req.query.name } };
    }

    Task.deleteMany(filter)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },

  remove: function (req, res) {
    Task.findOne({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },
};
