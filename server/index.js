const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});
// Root route for sanity check
app.get('/', (req, res) => {
  res.send('🚀 Welcome to BackendCURD API. Use /api/website/enquiry/* routes.');
});

// Enquiry routes
app.use('/api/website/enquiry', enquiryRouter);

// Connect to MongoDB
mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log(" Connected to MongoDB");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });

// Export the app (for serverless platforms like Vercel/Render)
module.exports = app;

// Start the server if not in serverless
if (require.main === module) {
  const PORT = process.env.PORT || 8000; // ✅ use Render’s assigned port
  app.listen(PORT, () => {
    console.log(`this Server running on port ${PORT} (render test v2)`);
  });
}
