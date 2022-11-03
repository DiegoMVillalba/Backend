import express from 'express';
const router = express.Router();
import session from 'express-session';
import logger from '../loggers/Log4jsLogger.js';

router.get('/login', async (req, res) => {
    logger.info();

    req.session.login
    ? res.redirect('/api/usuario')
    :res.render('pages/login', {status:false});
})


router.post('/login', async (req, res) => {
    const {user, pass} = req.body;
    if(process.env.USER === user && process.env.PASS === pass){
        req.session.login = true;
        res.redirect('/api/usuario')
    } else {
        req.session.login = false;
        res.redirect('/api/usuario/login')
    }
})

router.get('/', async ( req, res ) => {
    res.render('pages/home', {status: req.session.login})
})

router.get('/logout', async (req, res) => {
    req.session.destroy( (err) => {
        if(err){
            res.json(err);
        } else {
            res.render('pages/logout', {status: false});
        }
    })
})


export default router;