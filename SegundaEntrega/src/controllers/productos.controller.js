const getProduct = (req, res) =>{
    res.json({
        mensaje: 'Producto'
    });
};

const postProduct = (req, res) =>{
    res.json({
        mensaje: ' Post producto'
    });
};

const deleteProduct = (req, res) => {
    res.json({
        mensaje: 'Delete producto'
    });
};

const putProduct = (req, res) => {
    res.json({
        mensaje: 'Update producto'
    });
};


module.exports = {
    getProduct,
    postProduct,
    deleteProduct,
    putProduct
}