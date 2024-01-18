const User = require("../db/models/userModels");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { SECRET_KEY } = process.env;
const pathAvatar = path.join(__dirname, "../public/avatars");
const register = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const avatar = gravatar.url(email);

  const newUser = new User({ ...req.body, avatar });
  await newUser.hashPassword();

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: { name, email, avatar },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password doesn't right" });
    return;
  }

  const compareResult = await user.comparePassword(password);
  if (!compareResult) {
    res.status(401).json({ message: "Email or password doesn't right" });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email, name: user.name, avatar: user.avatar } });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.sendStatus(204);
};

const current = (req, res) => {
  const { name, email, avatar } = req.user;
  res.json({ name, email, avatar });
};
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    res.status(400).json({ message: "no file attached" });
    return;
  }
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}${originalname}`;

  const result = path.join(pathAvatar, fileName);
  await fs.rename(tempUpload, result);

  const avatar = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatar });

  res.json({
    avatar,
  });
};
module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar,
};
