const express = require("express");
const nunjucks = require("nunjucks");
const helmet = require("helmet");
const app = express();
app.use(helmet());

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("static"));

// Routes
app.get("/", require("./routes/index.js"));
app.get("/:lat,:lon", require("./routes/forecast.js"));

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));
} catch (error) {
  throw error;
}
