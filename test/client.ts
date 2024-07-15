import {Vegam} from "../dist/index.js"

const s = new Vegam({
  routerOptions: {
    onBadUrl: (path, req, res) => {
      res.statusCode = 400;
      res.end(`Bad path: ${path}`);
    },
  },


})

// s.useExMid((req,res,next) =>{
//   console.log("middleqare 1")
//   next()
// })
s.listen(8001, () => {
  console.log("port running");
});


s.use(({req,res},next)=>{
  console.log("it is middleware");
  next()
})
s.use(({req,res},next)=>{
  
  console.log("it is middleware2",req.body);
 next() 
})


s.use(({req,res},next)=>{
  console.log("it is middleware3");
 next() 
})
s.get("/test", ({ req, res }) => {
  console.log("this is router")
  res.text("2")
});
s.post("/query", ({ req, res }) => {
  console.log("quey files", req.files)
  console.log("quey body",req.body)

  res.text("heelow bro")
});
