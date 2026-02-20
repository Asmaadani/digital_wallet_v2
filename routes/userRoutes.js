const { createUser, listUsers, getUser,  updateUser, deleteUser} = require("../controllers/userController");

function handleUserRoutes(req, res, body) {

  const urlParts = req.url.split("/");
  const userId = urlParts[2];

  // POST /users (Créer un utilisateur)
  if (req.url === "/users" && req.method === "POST") {
    return createUser(req, res, body);
  }

  // GET /users (Liste tous les utilisateurs)
  if (req.url === "/users" && req.method === "GET") {
    return listUsers(req, res);
  }

  // GET /users/{id} (Récupérer un utilisateur)
  if (req.url.startsWith("/users/") && userId && !isNaN(userId) && req.method === "GET") {
    return getUser(req, res);
  }

  // PUT /users/{id} (Modifier un utilisateur)
  if (req.url.startsWith("/users/") && userId && !isNaN(userId) && req.method === "PUT") {
    return updateUser(req, res, body);
  }

  // DELETE /users/{id} (Supprimer un utilisateur)
  if (req.url.startsWith("/users/") && userId && !isNaN(userId) && req.method === "DELETE") {
    return deleteUser(req, res);
  }
  
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "User route not found" }));
}

module.exports = handleUserRoutes;
