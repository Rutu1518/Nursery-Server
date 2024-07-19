import express from "express";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import cors from "cors"

import { getHealth } from "./controllers/Health.js";
import {
     postPlant,
     getPlants,
     getPlantId,
     putPlantId, 
     deletePlantId  
    } from "./controllers/Plant.js";
import { handlePageNotFound } from "./controllers/errors.js";

const app = express()
app.use(cors())
app.use(express.json())

// const plants = [
//       {  
//         "id": 5,
//         "name": "Bamboo",
//         "category": "outdoor",
//         "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
//         "price": 150,
//         "description": "Lucky Bamboo 2 Layer Feng Shui Plant With Acrylic Pot and Stones"   
//      },
//      {  
//         "id": 2,
//         "name": "Rose",
//         "category": "outdoor",
//         "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
//         "price": 200,
//         "description": "Rose Plant With Acrylic Pot and Stones"   
//      },
//      {  
//         "id": 4,
//         "name": "Mango",
//         "category": "outdoor",
//         "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
//         "price": 250,
//         "description": "Mango Plant With Acrylic Pot and Stones"   
//      }
// ]

const dbConnection = async () =>{
  const conn = await mongoose.connect(process.env.MONGO_URL)

  if(conn){
    console.log(`MongoDB connected... `)
  }
  else{
    console.log(`MongoDB not connected`)
  }
}
dbConnection();

app.get("/Health", getHealth)
app.post("/plant", postPlant)
app.get("/plants", getPlants)
app.get("/plant/:id", getPlantId)
app.put("/plant/:id", putPlantId )
app.delete("/plant/:id", deletePlantId)

app.use("*", handlePageNotFound)

const PORT = process.env.PORT|| 8000

app.listen(PORT, ()=>{
    console.log(`server is running on $(PORT)`)
})