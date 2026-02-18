const http = require("http");
const handleUserRoutes = require("./routes/userRoutes");
const handleWalletRoutes = require("./routes/walletRoutes");

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", err => {
      reject(err);
    });
  });
}

const server = http.createServer(async (req, res) => {
  const body = await getRequestBody(req);

  if (req.url.startsWith("/users")) {
    return handleUserRoutes(req, res, body);
  }

  if (req.url.startsWith("/wallets")) {
    return handleWalletRoutes(req, res, body);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
