var TopicModel = require('mongoose').model('Topic');
var UserModel = require('mongoose').model('User');
var CategoryModel = require('mongoose').model('Category');
function Topic(obj) {
    for (var i in obj) {
        this[i] = obj[i];
    }
}
Topic.getAll = function (fn) {
    TopicModel.find({}).exec(function (err, topicExist){
        if (err) return fn(err);
        //if (!topicExist) return fn(err, 404);
        fn(topicExist);
    })
}

Topic.prototype.create = function (fn) {
    var self = this;
    UserModel.findOne({_id: self.author}).exec(function(err, user) {
        if (err) return fn(err);
        CategoryModel.findOne({_id: self.category}).exec(function (err, category) {
            var topic = new TopicModel(self);
            topic.save(function (err, topic) {
                if (err) return fn(err);
                user.topics.push(topic);
                user.save(function (err) {
                    if (err) return fn(err);
                })
                category.topics.push(topic);
                category.save(function (err) {
                    if (err) return fn(err);
                    fn(null, topic);
                })
            })
        })
    })
}

Topic.getTopicById = function (id, fn) {
    TopicModel.findOne({_id:id}).exec(function (err, topic) {
        if (err) return fn(err);
        fn(topic);
    });
}

// 
Topic.getTopicsByIds = function (ids, fn) {
    var resultArr = [];
    var count = 0;
    var targetCount = ids.length;
    var done = function () {
        count += 1;
        if (count === targetCount) {
            return fn(resultArr);
        }
    }
    ids.forEach(function (id) {
        TopicModel.findOne({_id:id}).exec(function (err, topic) {
            if (err) return fn(err);
            resultArr.push(topic);
            done();
        });
    })
}

Topic.addComment = function (id, obj, fn) {
    TopicModel.findOne({_id:id}).exec(function (err, topic) {
        if (err) return fn(err);
        topic.comment.push(obj);
        topic.save(function (err) {
            if (err) fn(err);
            fn(topic);
        })
    });
}

Topic.deleteTopic = function (id, fn) {
    TopicModel.remove({_id: id}, function (err) {
        if (err) fn(err);
        fn("ok");
    })
}
module.exports = Topic;
