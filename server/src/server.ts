import express, { type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import productRoute from "./routes/product";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import tranRoute from "./routes/transport"
const app = express();
const port = process.env.PORT ||3030;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: Number(process.env.LIMIT_REQ),
  handler: function (req, res) {
    res.status(429).send({
      status: 500,
      message: 'Too many requests!',
    });
  },
});

app.use((req, res, next) => {
  console.log(`Endpoint: ${req.originalUrl}`);
  next();
});


app.use(express.json());



app.get("/", (req:Request, res:Response) => {
  res.status(200).json({status:200,message:"Hello World!"});
});
app.use('/api/product',productRoute)
app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/tran',tranRoute)

app.get('/api/test',(req,res) => {
  res.json("test")
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});