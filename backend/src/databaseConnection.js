const { default: mongoose } = require("mongoose")

// Connecting with MongoDb database
async function dbConnect() {
	try {
		let targetDatabaseUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/OauthAuthentication";
		console.log("Connecting to database: " + targetDatabaseUrl);
		await mongoose.connect(targetDatabaseUrl);
		console.log("Database connected!");
	} catch (error) {  // catch error and display database connection error 
		console.log("Database connection failed!\n" + JSON.stringify(error)); 
	}
}

// Close database connection
async function dbClose() {
	await mongoose.connection.close();
	console.log("Database disconnected!");
}

module.exports = {
	dbConnect, dbClose
}