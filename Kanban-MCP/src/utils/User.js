const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  }],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
