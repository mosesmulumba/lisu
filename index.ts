import expres from 'express';
import { AdminRoute, UserRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/config';

const app = expres();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin' , AdminRoute);
app.use('/user' , UserRoute);

// app.use('/', (req , res , next)=>{
//     return res.json({message:"Welcome to the LISU Platform"});
// });
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
};

mongoose.connect(MONGO_URI , options).then(result =>{
    console.log('MongoDB is working');
    // console.log(result);
}).catch(
    err=> console.log('error'+ err));

app.listen(8010, ()=>{
    console.clear();
    console.log("App listeninig on the port 8010");
});