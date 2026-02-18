const { users } = require("../data/data");

// Create User
function createUser(req, res, body) {
  const { name } = JSON.parse(body);

  if (!name) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Name is required" }));
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
}

// Get All Users
function listUsers(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
}

module.exports = {
  createUser,
  listUsers
};
