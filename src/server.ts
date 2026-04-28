import app from "./app.js";

// Server listening port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 URL Shortener API running on port ${PORT}`);
});
