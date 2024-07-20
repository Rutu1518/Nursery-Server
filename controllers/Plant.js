import Plant from "./../models/Plant.js"

// const plants = [
//     {  
//       "id": 5,
//       "name": "Bamboo",
//       "category": "outdoor",
//       "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
//       "price": 150,
//       "description": "Lucky Bamboo 2 Layer Feng Shui Plant With Acrylic Pot and Stones"   
//    },
//    {  
//       "id": 2,
//       "name": "Rose",
//       "category": "outdoor",
//       "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
//       "price": 200,
//       "description": "Rose Plant With Acrylic Pot and Stones"   
//    },
//    {  
//       "id": 4,
//       "name": "Mango",
//       "category": "outdoor",
//       "image": "https://unlimitedgreens.com/cdn/shop/files/IMG_4861_768x960_fef97dca-d6a6-4ea7-b708-f996952d60d2.jpg?v=1686312519",
//       "price": 250,
//       "description": "Mango Plant With Acrylic Pot and Stones"   
//    }
// ]

const postPlant = async (req, res)=>{
        const{
            name,
            category,
            image,
            price,
            description
        } = req.body       
            
    
            const newPlant = new Plant({
                    name:name,
                    category: category,
                    image: image,
                    price: price,
                    description: description
            })

            const savedPlant = await newPlant.save();

            res.json({
                success:true,
                data:savedPlant,
                message: "New plant added successfully"
            })   
}

const getPlants = async (req, res)=>{
    
    // for(let i=0; i<9999999; i++){}
    const allPlants = await Plant.find().sort({updatedAt : -1})
    res.json({
        success:true,
        data:allPlants,
        message: "All plants fetched successfully"
    })
}

const getPlantId = async (req ,res)=>{
    const{id}=req.params
  
    //  const plant = plants.find((plant)=>plant.id == id)
    const plant = await Plant.findById(id) 
    
    res.json({
        success:plant ? true : false,
        data:id,
        message:plant ? "plant fetched successfully" : "plant not found"
    })
}

const putPlantId = async (req, res)=>{  
    const{       
        name,
        category,
        image,
        price,
        description
    } = req.body

    const{ id } = req.params

    await Plant.updateOne({_id : id},{
        $set:{
            name:name,
            category:category,
            image:image,
            price:price,
            description:description
        }
    })

    const updatedPlant = await Plant.findById(id)

    res.json({
        success:true,
        data:updatedPlant,
        message:"plant updated successfully"
    })
  }

const deletePlantId = async (req, res)=>{
    const{id}=req.params

     await Plant.deleteOne({
        _id:id
     })

        res.json({
             success:true,
             message:"plant deleted successfully",
             data:null
         })
}


export {
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId
}