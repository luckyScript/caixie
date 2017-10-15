var Category = require('../controllers/category');
var Topic = require('../controllers/topic')

exports.newCategory = function (app) {
    return function (req, res ,next) {
        if (!req.session.user) {
            res.render('page',{state: {state: 'login'},session: req.session});
        }
        var context = {
            state: {
                state: 'newCategory'
            },
            session: req.session
        }
        res.render('page',context);
    }
}


exports.newCategoryHandle = function (app) {
    return function (req, res, next) {
        var name = req.body.name;
        var category = new Category ({
			name:name
		});


		category.create(function(err, user) {
			if (err) return next(err);
			if (user == 409) {
                res.send({"result": "0"});
    			res.statusCode = 409;
                return;
			} else {
				res.statusCode = 200;
                res.send({"result": "1"});
                return;
			}
		})
    }
}

/**
 * TODO: cannot fetch topic 
 */
exports.getCategoryByName = function (app) {
    return function (req, res, next) {
        var categoryName = req.params.name;
        Category.getAll(function (categorys) {
            Category.findTopicsByName(categoryName, function (categoryTopic) {
                if (categoryTopic.length == 0) {
                    var context = {
                        state: {
                            state: 'index'
                        },
                        session: req.session,
                        topics: [],
                        categorys: categorys,
                        currentCategory: categoryName
                    }
                    res.render('page',context);
                } else {
                    Topic.getTopicsByIds(categoryTopic, function (topics) {
                        // 每页显示数目
                        var eachNum = 5;
                        var pageNumTotal = Math.ceil(topics.length/eachNum);
                        var pageNum = req.params.page;
                        // topics = topics.reverse().splice((pageNum-1)*eachNum, 5);
                        var pageNumArr = [];
                        
                        for (var i = 0; i < pageNumTotal; i++) {
                            pageNumArr[i] = i;
                        }
                        var context = {
                            state: {
                                state: 'index'
                            },
                            url: '/category/'+categoryName+'/',
                            currentPage: pageNum,
                            pageNumTotal:pageNumTotal,
                            pageNumArr: pageNumArr,
                            session: req.session,
                            topics:topics,
                            categorys: categorys,
                            currentCategory: categoryName
                        }
                        res.render('page',context);
                    });
                }
            });
        });
    }
}