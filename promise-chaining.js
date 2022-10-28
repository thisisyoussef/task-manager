require("./src/db/mongoose");
const { findByIdAndUpdate } = require("./src/models/task");
//const User = require("src/models/user.js");
const User = require("./src/models/user");

// User.findByIdAndUpdate("63361d97cc8a3d56e863bd25", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("63361d97cc8a3d56e863bd25", 1)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

