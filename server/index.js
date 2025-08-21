let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/website/enquiry', enquiryRouter);

// Connect to MongoDB (only once)
mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error detect " + err);
  });

// Export the app for Vercel
module.exports = app;

// If running locally (node index.js), start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
