const Task = require("../models").Task;

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

  create: function (req, res) {
    Task.create(req.body)
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  removeSelected: function (req, res) {
    Task.find()
      .then((dbModel) => dbModel.remove())
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
