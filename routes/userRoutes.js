const { createUser, listUsers } = require("../controllers/userController");

function handleUserRoutes(req, res, body) {

  if (req.url === "/users" && req.method === "POST") {
    return createUser(req, res, body);
  }

  if (req.url === "/users" && req.method === "GET") {
    return listUsers(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "User route not found" }));
}

module.exports = handleUserRoutes;
