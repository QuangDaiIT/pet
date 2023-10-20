const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');




const Schema = mongoose.Schema;
const Pet = new Schema({
    name: { type:String, required : true},
    description: { type:String, maxLength: 600 },
    image: { type:String, maxLength: 600},
    species: { type:String, maxLength: 255},
    kind: { type:String, maxLength: 255},
    style: {type:String, maxLength: 255},
    slug: { type: String, slug: "name", unique: true},
    price: {type: String},
    cart: false,
    //unique: true
  }, {
    timestamps: true,
  });

  // add plugins
  mongoose.plugin(slug);
  Pet.plugin(mongooseDelete,{
    deletedAt : true,
    overrideMethods: true });
  module.exports = mongoose.model('pet', Pet);