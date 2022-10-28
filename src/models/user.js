const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Insert a valid email");
      }
    },
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 19,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive");
      }
    },
    min: 18,
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password may not contain " + value);
      }
    },
    minlength: 7,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "first");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//Hash plain text password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// newUser
//   .save()
//   .then((error) => {
//     console.log("Saved " + newUser);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const newUser = new User({
//     email: "    A@email.com",
//     name: "   Youssef  ",
//     age: 34,
//     password: "asdAda@#4s",
//   });
