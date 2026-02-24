const { users } = require("../data/store");

// CREATE
exports.createUser = (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// GET ALL
exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

// GET ONE
exports.getUser = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

// UPDATE
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  user.name = name;
  user.email = email;
  user.phone = phone;

  res.status(200).json(user);
};

// DELETE
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(200).json({ message: "User deleted successfully" });
};