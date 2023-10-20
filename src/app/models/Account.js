const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');




const Schema = mongoose.Schema;
const Account = new Schema({
    username: { type:String, required : true},
    password: { type:String, maxLength: 600 , required: true },
    admin : {type: String},
    avatar: {type:String},
    status: {type: String},
    // image: { type:String, maxLength: 600},
    // slug: { type: String, slug: "name", unique: true}
    //unique: true
  }, {
    timestamps: true,
  });

  // add plugins
  mongoose.plugin(slug);
  Account.plugin(mongooseDelete,{
    deletedAt : true,
    overrideMethods: true });
  module.exports = mongoose.model('account', Account);