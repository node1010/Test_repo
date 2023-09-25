const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

// exports.register = asyncHandler(async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const profile = req.file.filename;
//     if (!name || !email || !password || !profile)
//       return next(new Error("Fill require fields"));

//     const findUser = await User.findOne({ email });
//     if (findUser) return next(new Error("email already register"));

//     const createUser = await User.create({ name, email, profile, password });
//     return res.json({
//       status: true,
//       message: "Register Successfully",
//       createUser,
//     });
//   } catch (error) {
//     throw new Error(error.message);
//     // res.status(500).json({
//     //   status: false,
//     //   message: error.message
//     // });
//   }
// });

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const files = req.files;
    const profile = {};
    const profiles = {};

    files.filter((file) => {
      const key = file.fieldname;

      const nKey = key.split(".")[1];
      // console.log(nKey);

      if (key.startsWith("profile.")) {
        profile[nKey] = file.filename;
      } else {
        console.log("1==>",profiles[nKey]);
        if (!profiles[nKey]) {
          profiles[nKey] = [];
        }
        
        profiles[nKey].push(file.filename);
      }
    });

    // ---------------------------------

    if (!name || !email || !password)
      return next(new Error("Please enter require fields"));

    const findUser = await User.findOne({ email });
    if (findUser) return next(new Error("email already register"));

    const createUser = await User.create({
      name,
      email,
      profile,
      profiles,
      password,
    });
    return res.json({
      status: true,
      message: "Register Successfully",
      createUser,
    });
  } catch (error) {
    throw new Error(error.message);
    // res.status(500).json({
    //   status: false,
    //   message: error.message
    // });
  }
});

exports.getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const getUser = await User.findById(id);
    return res.json({
      status: true,
      message: "Your profile",
      getUser,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginUser = asyncHandler(async (req, res, next) => {
  // try {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) return next(new Error("email not found check you email"));

  const isMatch = await findUser.validatePassword(password);
  if (!isMatch) return next(new Error("Incorrect Password"));

  const token = await findUser.generateAuthToken();
  const option = {
    httpOnly: true,
    maxAge: 20 * 60 * 60 * 1000,
  };

  return res.cookie("token", token, option).json({
    status: true,
    message: ">> Wel-Come Back..! >>",
    data: {
      name: findUser.name,
      email: findUser.email,
    },
  });
  // } catch (error) {
  //   // throw new Error(error.message);
  //   return res.json({
  //     status: true,
  //     message: error.message
  //   })
  // }/'
});

exports.logout = asyncHandler(async (req, res, next) => {
  const option = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };

  res.status(200).cookie("token", null, option).json({
    status: true,
    message: "Logout",
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const deleteOne = await User.findByIdAndDelete(id);

  const profileName = deleteOne.profile;

  // fs.unlinkSync(path.resolve(__dirname, "../uploads/" + profileName.filename))
  if (profileName) {
    fs.unlinkSync(path.join(__dirname, "../uploads/" + profileName.filename));
  }

  // console.log(deleteOne);
  return res.json({
    status: true,
    message: "User Deleted",
    data: {
      name: deleteOne.name,
    },
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id, name, email, password } = req.body;
  const profile = req.file;
  const oldFile = await User.findById(id);
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password,
      profile,
    },
    { new: true }
  );

  // console.log("==>", oldFile);

  if (req.file) {
    const url_path = path.resolve(
      __dirname,
      "../uploads/" + oldFile.profile.filename
    );
    fs.unlinkSync(url_path);
  }

  return res.json({
    status: true,
    message: "User updated",
    updateUser,
  });
});



// -----------------------------------------------------------------------------------------------------------------------------------
// setInterval(() => {
//   console.log("Delayed for 1 second.");
// }, "1000");

const user = {
  name: "Alex",
  address: "15th Park Avenue",
  age: 43,
  department: {
    name: "Sales",
    Shift: "Morning",
    address: {
      city: "Bangalore",
      street: "7th Residency Rd",
      zip: 560001,
    },
  },
};

const user1 = {
  fullName: "Alex",
  newAddress: "12th Park Avenue",
};

const {
  department: {
    name,
    address: { city, street },
  },
} = user;

// console.log(name, city, street);
// const {age, ...rest} = user;
// console.log(age, rest);
// console.log(user);
// console.log({...user});
// console.log({...user, ...user1});
// getValue('name')

const dynamicKey = "age";
const dynamicValue = 30;

const dynamicObject = {
  name: "Amin",
};

// Using bracket notation to
//set properties dynamically
dynamicObject[dynamicKey] = dynamicValue;
dynamicObject["city"] = "Surat";

// console.log(dynamicObject);

// const a = [1, 2, 3];
// const b = [4, 5, 9];
// const c = ['r','u','s','h'];
// const d = 'Bha';

// a.push(...c,...d);

// console.log(a);
