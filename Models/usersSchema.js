const validator = require("validator");
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    birthStar: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
    caste: {
      type: String,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    gotra: {
      type: String,
      required: true,
    },
    zodiacSign: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    detailsOfBrideOrGroomWealth: {
      type: String,
      required: true,
    },
    parentsDetails: {
      type: String,
      required: true,
    },
    parentsFamilyDetails: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mothersRelativeDetails: {
      type: String,
      required: true,
    },
    fathersRelativeDetails: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("not valid email");
        }
      },
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    gender: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dateCreated: Date,
    dateUpdated: Date,
  },
  { timestamps: true }
);

const users = new mongoose.model("user_details", usersSchema);

module.exports = users;
