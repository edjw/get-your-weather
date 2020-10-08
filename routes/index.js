const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("index.html", {});
  } catch (error) {
    throw error;
  }
});

module.exports = router;
