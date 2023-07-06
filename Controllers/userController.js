const users = require("../Models/usersSchema");
const moment = require("moment");

//Register User

exports.userPost = async (req, res) => {
  const file = req.file.filename;
  const {
    name,
    dateOfBirth,
    fatherName,
    motherName,
    city,
    birthStar,
    colour,
    education,
    income,
    caste,
    birthPlace,
    height,
    gotra,
    zodiacSign,
    profession,
    detailsOfBrideOrGroomWealth,
    parentsDetails,
    parentsFamilyDetails,
    address,
    mothersRelativeDetails,
    fathersRelativeDetails,
    email,
    mobile,
    gender,
    status,
  } = req.body;

  if (
    !name ||
    !dateOfBirth ||
    !fatherName ||
    !motherName ||
    !city ||
    !birthStar ||
    !colour ||
    !education ||
    !income ||
    !caste ||
    !birthPlace ||
    !height ||
    !gotra ||
    !zodiacSign ||
    !profession ||
    !detailsOfBrideOrGroomWealth ||
    !parentsDetails ||
    !parentsFamilyDetails ||
    !address ||
    !mothersRelativeDetails ||
    !fathersRelativeDetails ||
    !email ||
    !mobile ||
    !gender ||
    !status ||
    !file
  ) {
    res.status(401).json("All Input Fields are Required");
  }

  try {
    const existingUser = await users.findOne({ email: email });

    if (existingUser) {
      res.status(401).json("This User Already exist's in our database");
    } else {
      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const usersData = new users({
        name,
        dateOfBirth,
        fatherName,
        motherName,
        city,
        birthStar,
        colour,
        education,
        income,
        caste,
        birthPlace,
        height,
        gotra,
        zodiacSign,
        profession,
        detailsOfBrideOrGroomWealth,
        parentsDetails,
        parentsFamilyDetails,
        address,
        mothersRelativeDetails,
        fathersRelativeDetails,
        email,
        mobile,
        gender,
        status,
        profile: file,
        dateCreated,
      });
      await usersData.save();
      res.status(200).json(usersData);
    }
  } catch (error) {
    res.status(401).json({ message: "User Registration failed!" });
  }
};

//Get Users

exports.getUser = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 10;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  if (gender !== "I'm looking for") {
    query.gender = gender;
  }

  if (status !== "All") {
    query.status = status;
  }

  try {
    const skip = (page - 1) * ITEM_PER_PAGE;
    const count = await users.countDocuments(query);

    const usersData = await users
      .find(query)
      .sort({ dateCreated: sort == "Newest" ? -1 : 1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    res.status(200).json({ pagination: { count, pageCount }, usersData });
  } catch (error) {
    res.status(401).json({ message: "Get Users Failed!" });
  }
};

//Get Single User

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await users.findOne({ _id: id });
    res.status(200).json(userData);
  } catch (error) {
    res.status(401).json({ message: "Single User Get Failed" });
  }
};

//Edit User Details

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    dateOfBirth,
    fatherName,
    motherName,
    city,
    birthStar,
    colour,
    education,
    income,
    caste,
    birthPlace,
    height,
    gotra,
    zodiacSign,
    profession,
    detailsOfBrideOrGroomWealth,
    parentsDetails,
    parentsFamilyDetails,
    address,
    mothersRelativeDetails,
    fathersRelativeDetails,
    email,
    mobile,
    gender,
    status,
    user_profile,
  } = req.body;

  const file = req.file ? req.file.filename : user_profile;

  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: id },
      {
        name,
        dateOfBirth,
        fatherName,
        motherName,
        city,
        birthStar,
        colour,
        education,
        income,
        caste,
        birthPlace,
        height,
        gotra,
        zodiacSign,
        profession,
        detailsOfBrideOrGroomWealth,
        parentsDetails,
        parentsFamilyDetails,
        address,
        mothersRelativeDetails,
        fathersRelativeDetails,
        email,
        mobile,
        gender,
        status,
        dateUpdated,
        profile: file,
      },
      {
        new: true,
      }
    );
    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(401).json({ message: "User Updating Failed!" });
  }
};

//Status Change

exports.userStatusChange = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const statusUpdate = await users.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    res.status(200).json(statusUpdate);
  } catch (error) {
    res.status(401).json({ message: "Status didn't Updated" });
  }
};
