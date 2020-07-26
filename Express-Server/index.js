const express=require('express');
const http=require('http');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const { EWOULDBLOCK } = require('constants');
const dishrouter=require('./routes/dishrouter');
const hostname='localhost';
const port=3000;

const app=express();
app.use(morgan('dev'));
app.use(bodyparser.json())
app.use('/dishes',dishrouter);
app.use(express.static(__dirname+'/public'));



// app.get('/dishes/:dishId',(req,res,next)=>{
//     res.end('will send details of the dish!: '+req.params.dishId+' to you');
// });

// app.post('/dishes/:dishId',(req,res,next)=>{
//     res.statusCode=403;
//     res.end('post operations not supported on /dishes/ '+req.paramas.dishId);
// });

// app.put('/dishes/:dishId',(req,res,next)=>{
//     res.write('updating dish: '+req.params.dishId+'\n');
//     res.end('will update the dish: '+req.body.name+' with details: '+req.body.description);


// });

// app.delete('/dishes/:dishId',(req,res,next)=>{
//     res.end('deleting dish: '+req.params.dishId);
// });




app.use((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end("<html><body><h1>this is express server</h1></body></html>");
});


const server=http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);

});