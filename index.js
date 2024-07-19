import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())

const plants = [
      {  
        "id": 5,
        "name": "Bamboo",
        "category": "outdoor",
        "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
        "price": 150,
        "description": "Lucky Bamboo 2 Layer Feng Shui Plant With Acrylic Pot and Stones"   
     },
     {  
        "id": 2,
        "name": "Rose",
        "category": "outdoor",
        "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
        "price": 200,
        "description": "Rose Plant With Acrylic Pot and Stones"   
     },
     {  
        "id": 4,
        "name": "Mango",
        "category": "outdoor",
        "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
        "price": 250,
        "description": "Mango Plant With Acrylic Pot and Stones"   
     }
]

app.post("/plant", (req, res)=>{
    const{
        name,
        category,
        image,
        price,
        description}=req.body
      
        if(!name){
           return res.json({
                success:false,
                data:null,
                message:"name is required...."
            })
        }

        if(!category){
            return res.json({
                 success:false,
                 data:null,
                 message:"category is required...."
             })
         }

         if(!image){
            return res.json({
                 success:false,
                 data:null,
                 message:"image is required...."
             })
         }

         if(!price){
            return res.json({
                 success:false,
                 data:null,
                 message:"price is required...."
             })
         }

         if(!description){
            return res.json({
                 success:false,
                 data:null,
                 message:"description is required...."
             })
         }
        const randomId = Math.round(Math.random() * 10000)

        const newPlant = {
            id:randomId,
            name:name,
            category: category,
            image: image,
            price: price,
            description: description

        }
        plants.push(newPlant)

        res.json({
            success:true,
            data:newPlant,
            message: "New plant added successfully"
        })
})

app.get("/plants", (req, res)=>{
    res.json({
        success:true,
        data:plants,
        message: "All plants added successfully"
    })
})

app.get("/plant/:id",(req ,res)=>{
    const{id}=req.params
  
     const plant = plants.find((plant)=>plant.id == id)
    
    res.json({
        success:plant ? true : false,
        data:id,
        message:plant ? "plant fetched successfully" : "plant not found"
    })
})

app.put("/plant/:id", (req, res)=>{
    const{id}=req.params
   
    let index = -1

    plants.forEach((plant, i)=>{
        if(plant.id == id){
            index = i
        }
    })
 
    const newObj = {
        id,
        name,
        category,
        image,
        price,
        description

    }
    if(index==-1){
        return res.json({
            success:false,
            data:null,
            message: "plant not found for id ${id}"
        })
    }
    else{
        plants[index] = newObj        
        return res.json({
             success:true,
             message:"plant updated successfully",
             data:newObj
          })

    }
   
})

app.delete("/plant/:id",(req, res)=>{
    const{id}=req.params

     let index = -1
     plants.forEach((plant, i)=>{
        if(plant.id == id){
            index = i
            }
        })

        if(index==-1){
            return res.json({
                success:true,
                // data:null,
                message: `plant not found for id ${id}`
                })
        }
        plants.splice(index, 1)

        res.json({
             success:true,
             message:"plant deleted successfully",
             data:null
         })
})

app.use("*", (req, res)=>{
    res.send(`<div>
     <h1 style="text-align:center;"> 404 not found</h1>
    </div> 
`)
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server is running on $(PORT)`)
})