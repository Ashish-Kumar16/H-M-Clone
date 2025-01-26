const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    pass: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  {
    versionKey: false,
  },
);

// Hash password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("pass")) {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
  }
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
