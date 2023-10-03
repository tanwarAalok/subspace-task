const express = require("express");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = 5000;

app.use("/api", blogRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
