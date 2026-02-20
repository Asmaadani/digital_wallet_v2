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

// Get User by ID
function getUser(req, res) {
  const parts = req.url.split("/");
  const userId = parseInt(parts[2]);

  const user = users.find(u => u.id === userId);

  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Utilisateur non trouvé" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}


// Update User
function updateUser(req, res, body) {
  const parts = req.url.split("/");
  const userId = parseInt(parts[2]);

  const { name } = JSON.parse(body);

  if (!name) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Name is required" }));
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Utilisateur non trouvé" }));
  }

  // Mettre à jour l'utilisateur
  users[userIndex].name = name;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Utilisateur mis à jour avec succès",
    user: users[userIndex]
  }));
}

// Delete User
function deleteUser(req, res) {
  const parts = req.url.split("/");
  const userId = parseInt(parts[2]);

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Utilisateur non trouvé" }));
  }

  // Supprimer l'utilisateur
  const deletedUser = users.splice(userIndex, 1)[0];

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Utilisateur supprimé avec succès",
    user: deletedUser
  }));
}

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser
};
