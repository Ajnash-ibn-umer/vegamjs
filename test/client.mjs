import  app from "../dist/index.mjs"

const s=app()
s.listen(8001)
s.get("/url",(req,res)=>{
    res.end("wow")
})