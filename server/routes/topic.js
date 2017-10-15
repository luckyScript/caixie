var Topic = require('../controllers/topic');
var User = require('../controllers/user');
var Category = require('../controllers/category');
var marked = require('marked');



exports.newTopic = function (app) {
    return function (req, res, next) {
        if (!req.session.user) {
            res.render('page',{state: {state: 'login'},session: req.session});
        }
        Category.getAll(function (categorys) {
            var context = {
                state: {
                    state: 'newTopic'
                },
                session: req.session,
                categorys: categorys
            }
            res.render('page',context);
        });
    }
}
exports.newTopicHandle = function (app) {
    return function (req, res, next) {
        var authorName = req.body.author;
        var categoryName = req.body.categoryName;
        User.findIdByName(authorName, function(authorId) {
            Category.findIdByName(categoryName, function (categoryId) {
                var title = req.body.title;
                var content = req.body.content;
                var topic = new Topic({
                    category: categoryId,
                    categoryName: categoryName,
                    author: authorId,
                    authorName: authorName,
                    title: title,
                    content: content
                });
                topic.create(function (err, result) {
                    if (err) return next(err);
                    res.send({"result": 1});
                });
            })
        });
    }
}
exports.getTopic = function (app) {
    return function (req, res, next) {
        id = req.params.id;
        Topic.getTopicById(id, function(topic) {
            marked.setOptions({
                highlight: function (code) {
                    return require('highlight.js').highlightAuto(code).value;
                }
            });
            topic.content = marked(topic.content);
            topic.commentFE = [];
           
            for (var i = 0; i < topic.comment.length; i++) {
                topic.commentFE[i] = {
                    username: JSON.parse(topic.comment[i]).username,
                    content: marked(JSON.parse(topic.comment[i]).content)
                }
            }
            
            var context = {
                state: {
                    state: 'topic'
                },
                session: req.session,
                topic: topic
            }
            
            res.render('page', context);
        })
    }
}
exports.addComment = function (app) {
    return function (req, res, next) {
        if (req.session.user) {
            id = req.params.id;
            var comment = {
                username: req.body.username,
                content: req.body.content
            }
            Topic.addComment(id, JSON.stringify(comment), function (topic) {
                res.send({"result": 1});
            })
        }else {
            res.redirect('/');
        }
    }
}

exports.deleteTopic = function (app) {
    return function (req, res, next) {
        if (req.session.user && req.session.user.power == 1) {
            id = req.params.id;
            // console.log(id)
            Topic.deleteTopic(id, function (msg) {
                if (msg == "ok") {
                    res.redirect('/');
                } else {
                    console.log("error on delete");
                }
            });
        } else {
            res.redirect('/');
        }
    }
}