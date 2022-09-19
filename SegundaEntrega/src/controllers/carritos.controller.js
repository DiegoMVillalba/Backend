const getCart = (req, res ) =>{
    res.json({
        mensaje: 'Carrito'
    });
};

const postCart = (req, res) => {
    res.json({
        mensaje: 'Post cart'
    });
};

const deleteCart = (req, res) => {
    res.json({
        mensaje: 'Delete cart'
    });
};

const putCart = (req, res) => {
    res.json({
        mensaje: ' Update cart'
    });
};

module.export = {
    getCart,
    postCart,
    deleteCart,
    putCart,
};