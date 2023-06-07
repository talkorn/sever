const mongoose = require("mongoose");
const {
  URL,
  DEFAULT_STRING_SCHEMA,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const userSchema = new mongoose.Schema({
  name: {
    first: DEFAULT_STRING_SCHEMA_REQUIRED,
    middle: DEFAULT_STRING_SCHEMA,
    last: DEFAULT_STRING_SCHEMA_REQUIRED,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
  },
  address: {
    state: DEFAULT_STRING_SCHEMA,
    country: DEFAULT_STRING_SCHEMA_REQUIRED,
    city: DEFAULT_STRING_SCHEMA_REQUIRED,
    street: DEFAULT_STRING_SCHEMA_REQUIRED,
    houseNumber: {
      type: Number,
      trim: true,
      required: true,
      minLength: 1,
    },
  },
  image: {
    url: URL,
    alt: DEFAULT_STRING_SCHEMA_REQUIRED,
  },
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("users", userSchema);
module.exports = user;
