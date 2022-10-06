require("dotenv").config();

const CarritoDaoArchivo = require('../daos/carritos/CarritoDaoArchivo');
const CarritoDaoFirebase = require('../daos/carritos/CarritoDaoFirebase');
const CarritoDaoMongoDB = require('../daos/carritos/CarritoDaoMongoDB');

const ProductoDaoArchivo = require("./productos/ProductoDaoArchivo.js");
const ProductoDaoMongoDB = require("./productos/ProductoDaoMongoDB.js");
const ProductoDaoFirebase = require("./productos/ProductoDaoFirebase.js");

// export condicional a la variable ENVIROMENT DAO

if (process.env.DAO === "FS") {
	module.exports = {CarritoDaoArchivo, ProductoDaoArchivo}
} else if (process.env.DAO === "MONGO") {
	exports.Carrito = CarritoDaoMongoDB;
	exports.Producto = ProductoDaoMongoDB;
} else if (process.env.DAO === "FB") {
	exports.Carrito = CarritoDaoFirebase;
	exports.Producto = ProductoDaoFirebase;
} else {
	console.log("Inténtelo de nuevo.");
}