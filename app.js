const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Routes
app.get("/", require("./routes/index.js"));
app.get("/:lat,:lon", require("./routes/forecast.js"));

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));
} catch (error) {
  throw error;
}
