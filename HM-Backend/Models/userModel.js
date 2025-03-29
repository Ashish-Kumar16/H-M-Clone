const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
    },
    lastName: {
      type: String,
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
    dateOfBirth: {
      type: Date,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      match: /^\+?[1-9]\d{1,14}$/,
    },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      country: { type: String, required: false, default: "India" },
      postalCode: {
        type: String,
        required: false,
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
