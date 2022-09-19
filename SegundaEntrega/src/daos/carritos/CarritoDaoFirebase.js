
const  ContenedorFirebase = require("../../container/ContenedorFirebase");

class CarritoDaoFirebase extends ContenedorFirebase {
	constructor() {
		super("carritos");
	}
}

module.exports = CarritoDaoFirebase;