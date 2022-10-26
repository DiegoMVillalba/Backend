import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    timestamp:{
        type: Date,
        default: Date.now
    },
    products:[
            {
               type: mongoose.Schema.Types.ObjetId,
               ref:'productos'
        }
    ]
});


export const CarritosModel = mongoose.model('carritos', Schema);
