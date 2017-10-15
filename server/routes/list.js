const Category = require('../controllers/category');
const Topic = require('../controllers/topic');

exports.getTableList = function (app) {
  return function (req, res ,next) {
    res.send(`{
      "success": 1,
      "data": "test"
    }`);

  }
};
