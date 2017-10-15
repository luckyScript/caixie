var CategoryModel = require("mongoose").model('Category');

function Category (obj) {
    for (var i in obj) {
        this[i] = obj[i];
    }
}
Category.getAll = function (fn) {
    CategoryModel.find({}).exec(function (err, categoryExists){
        if (err) return fn(err);
        //if (!topicExist) return fn(err, 404);
        fn(categoryExists);
    })
}
Category.prototype.create = function (fn) {
    var self = this;
    CategoryModel.findOne({"name": self.name}).exec(function (err, categoryExists) {
        if (err) return fn(err);
        if (categoryExists) {
            return fn(null, 409);
        }

        var categoryData = new CategoryModel(self);
        categoryData.save(self, function (err, user) {
            if (err) return fn(err);
            fn(null, user);
        });
    })
}
Category.findIdByName = function (name, fn) {
    CategoryModel.findOne({name: name}).exec(function (err, categoryExists) {
        if (err) return fn(err);
        if (!categoryExists) return;
        fn(categoryExists._id);
    })
}

Category.findTopicsByName = function (name, fn) {
    CategoryModel.findOne({name: name}).exec(function (err, categoryTopics) {
        if (err) return fn(err);
        if (!categoryTopics) return;
        return fn(categoryTopics.topics);

    })
} 
module.exports = Category;
