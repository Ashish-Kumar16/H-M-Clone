// const fs = require("fs");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const ProductModel = require("../Myntra-App-Backend/Models/productModel"); // Adjust the path to your model

// dotenv.config({ path: "./config.env" });

// // Connect to the local MongoDB database
// mongoose
//   .connect("mongodb://localhost:27017/HM-database", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB connected"));

// // READ JSON FILE
// const products = JSON.parse(
//   fs.readFileSync(`${__dirname}/products.json`, "utf-8"),
// );

// // IMPORT DATA INTO DB
// const importData = async () => {
//   try {
//     await ProductModel.create(products); // Importing products data to the DB
//     console.log("Products successfully loaded!");
//   } catch (err) {
//     console.error("Error occurred while importing data:", err);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await ProductModel.deleteMany(); // Deleting all products from the DB
//     console.log("Products successfully deleted!");
//   } catch (err) {
//     console.error("Error occurred while deleting data:", err);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// // Running the script with commands
// if (process.argv[2] === "--import") {
//   importData();
// } else if (process.argv[2] === "--delete") {
//   deleteData();
// }
