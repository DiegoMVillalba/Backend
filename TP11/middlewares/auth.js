const login = (req, res, next) =>{
    if(req.session?.name) {
        next()
    } else {
        res.render('../views/login.hbs');
    }
}

module.exports = login;