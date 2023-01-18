const mongoose = require("mongoose");
const config = require("../config/index.js");
const dotenv = require("dotenv");
dotenv.config()

class MongoCxn {
  constructor() {
    if (MongoCxn.instancia) {
      return MongoCxn.instancia;
    }

    this.connection = this.createConnection();
    MongoCxn.instancia = this;
  }

  createConnection() {
    const uri = process.env.MONGO_DB;
    
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(uri, options).then(
      () => {},
      (err) => {
        err;
      }
    );
  }
}

module.exports = MongoCxn;
