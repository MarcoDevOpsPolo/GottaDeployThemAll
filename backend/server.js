import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const PORT = process.env.PORT || 8128; // Use environment port or default to 8128

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
app.use(express.static(join(__dirname, "../dist"))); // Assuming 'dist' is where your build files are located

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
