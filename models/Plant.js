import { Schema, model } from "mongoose";


const plantSchema = new Schema({
    name: String,
    categoty:String,
    description: String,
    image: String,
    price: Number
},{
    timestamps: true
})

const Plant = model( "Plant", plantSchema)

export default Plant