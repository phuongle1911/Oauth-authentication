const { dbConnect } = require("./databaseConnection");
const { app } = require("./server");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Database connection
dbConnect().then(() => {
  // Express server activation
    app.listen(PORT, () => {
    console.log("The server is running in port:" + PORT);
  });
});