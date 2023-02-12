const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Please add city"],
  },
  suite: {
    type: String,
    required: [true, "Please add suite"],
    trim: true,
  },
  city: {
    type: String,
    rquired: true,
    trim: true,
    lowercase: true,
    validate: function (value) {
      let cityRegex = /^[a-zA-Z ]*$/;
      return cityRegex.test(value);
    },
  },
  zipcode: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: function (value) {
      let zipcodeRegex = /^\d{5}(?:-\d{4})?$/;
      return zipcodeRegex.test(value);
    },
  },
  geo: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
  },

  username: {
    type: String,
    required: [true, "Please add username"],
    trim: true,
    lowercase: true,
    minlength: 4,
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    trim: true,
    validate: function (value) {
      let emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(value);
    },
  },

  address: {
    type: AddressSchema,
    ref: "Address",
  },

  phone: {
    type: String,
    required: true,
    validate: function (value) {
      let phoneRegex = /^\d[-]\d{3}[-]\d{3}[-]\d{4}$/;
      return phoneRegex.test(value);
    },
  },

  website: {
    type: String,
    required: true,
    validate: function (value) {
      let urlRegex =
        /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/;
      return urlRegex.test(value);
    },
  },

  company: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    catchPhrase: { type: String, required: true, trim: true },
    bs: { type: String, required: true, trim: true },
  },
});

const User = mongoose.model("Users", UserSchema, "Users");
module.exports = User;
