const app = require("./app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});

// const app = require("./app");
// const mongoose = require('mongoose'); // MongoDB for database
// require('dotenv').config(); // To load environment variables

// // Port configuration
// const PORT = process.env.PORT || 5000;

// // Database connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB connected successfully.');
//     })
//     .catch((err) => {
//         console.log('Error connecting to MongoDB:', err.message);
//     });

// // Sample route (You can define more in your app.js or route files)
// app.get('/', (req, res) => {
//     res.send("Welcome to the HRM API");
// });

// // Existing listen function to keep unchanged
// app.listen(PORT, () => {
//     console.log(`Server is running on : http://localhost:${PORT}`);
// });