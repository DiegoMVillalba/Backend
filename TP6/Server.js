const express = require("express");
const handlebars = require("express-handlebars");

const  Contenedor  = require("./contenedor");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

const contenedor = new Contenedor("./productos.json");
const comentarios = new Contenedor("./mensajes.json");

io.on("connection", async socket => {
	let mensajesChat = await comentarios.getAll();
	console.log("Se contectó un usuario");

	const mensaje = {
		mensaje: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", mensaje);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const mensaje = {
			mensaje: "mensaje nuevo",
			mensajesChat
		};

		const id = new Date().getTime();
		io.sockets.emit("mensaje-servidor", mensaje);
		cb(id);
		await comentarios.save({
			id,
			mail: msg.mail,
			mensaje: msg.mensaje,
			fecha: msg.hora
		});
	});
});

app.use(express.static("public"));
app.engine(
    'hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout:'main.hbs',
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("layout/index.hbs", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("productos", {
		titulo: "Productos",
		list: producto,
		listExist: true,
		producto: true
	});
});

app.post("/", async (req, res) => {
	const objProducto = req.body;
	contenedor.save(objProducto);
	res.redirect("/");
});

httpServer.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});
