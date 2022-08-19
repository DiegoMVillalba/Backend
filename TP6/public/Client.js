const server = io().connect()

const render = mensajeChat =>{
    let chat = document.getElementById("chat");
    let html = mensajeChat.map( msj => {
        return`<li>
                <strong>Mail: ${msj.mail} </strong> 
                [<span>${msj.fecha}</span>]:
                <em>Mensaje: ${msj.mensaje}</em>       
        </li>`
        
    })
    chat.innerHTML = html
}

const addMensaje = (evt) => {
    const mail = document.getElementById('mail').value;
    const mensaje = document.getElementById('mensaje').value;

    const chats = {mail, mensaje}

    server.emit('nuevo-chat', chats, id=>{
        console.log(id);
    })
    return false
}
server.on('mensaje-sevidor', mensaje =>{
    render(mensaje.mensajeChat);
})