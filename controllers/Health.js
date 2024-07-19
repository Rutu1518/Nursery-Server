function getHealth(req, res){
    res.json({
        message: "Server is up and running...",
        success:true
    })
}
export {getHealth}