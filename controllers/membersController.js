var db = require('../models');

function create(req, res){
  console.log("server side request made");
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
