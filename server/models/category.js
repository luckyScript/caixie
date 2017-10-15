var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    name: String,
    topics: [
        { type: Schema.Types.ObjectId, ref: 'Topic'}
    ]
}

var category = new Schema(schema);

exports.model = mongoose.model('Category', category);
exports.schema = schema;
