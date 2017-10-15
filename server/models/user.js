var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    username: String,
    password: String,
    salt: String,
    power: String,
    topics: [
        { type: Schema.Types.ObjectId, ref: 'Topic' }
    ]
};

var user = new Schema(schema);

exports.model = mongoose.model('User', user);
exports.schema = schema;
