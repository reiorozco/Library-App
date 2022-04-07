module.exports = function (err, req, res) {
  console.error(err.stack);

  res.status(500).send("Something failed.");
};
