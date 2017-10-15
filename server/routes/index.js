module.exports = function (app) {
  let express = require('express');
  let router = express.Router();

  // routes
  let index = require("./indexP");
  let user = require("./users");
  let topic = require("./topic");
  let category = require("./category");
  let invite = require('./invite');
  let list = require('./list');

  //list router
  router.get('/server/list', list.getTableList());


  /************ user router **************/
  // get login page
  router.get('/login', user.login(app));
  router.post('/login', user.loginHandle(app));
  router.get('/register', user.register(app));
  router.post('/register', user.registerHandle(app));
  router.get('/logout', user.logout(app));

  /************* topic router **************/
  router.get('/newTopic', topic.newTopic(app));
  router.post('/newTopic', topic.newTopicHandle(app));
  router.get('/topic/:id', topic.getTopic(app));
  router.post('/comment/:id', topic.addComment(app));
  router.get('/Deletetopic/:id', topic.deleteTopic(app));

  /**************** category router ***********/
  router.get('/newCategory', category.newCategory(app));
  router.post('/newCategory', category.newCategoryHandle(app));
  router.get('/category/:name/:page', category.getCategoryByName(app));

  /***************** invite router ***************/
  // router.get('/invite', invite.newCode(app));
  return router;
};
