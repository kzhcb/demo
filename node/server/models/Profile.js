const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create schema
const ProfileSchema = new Schema({
  type: {
    type: String
  },
  descript: {
    type: String
  },
  income: {
    type: String,
    required:true
  },
  expend: {
    type: String,
    required:true
  },
  cash: {
    type: String,
    required:true
  },
  remark: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
