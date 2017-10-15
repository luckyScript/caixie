var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    authorName: String,
    time: String,
    title: String,
    content: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    categoryName: String,
    comment: [
        {type: String}
    ],
};

var topic = new Schema(schema);

exports.model = mongoose.model('Topic', topic);
exports.schema = schema;
