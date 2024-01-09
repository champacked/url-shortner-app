const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  full: {
    type: String,
    require: true,
  },
  short: {
    type: String,
    require: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    require: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: { type: Date, default: () => Date.now() + 48 * 60 * 60 * 1000 },
});

module.exports = mongoose.model("shorturl", shortUrlSchema);
