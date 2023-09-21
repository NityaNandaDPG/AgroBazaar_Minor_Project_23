const express=require('express');
const connectDB=require('./config/db');
const cors = require('cors');
const products = require('./routes/api/products');
const auth = require('./routes/api/auth');

const app=express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/',(req,res)=>res.send('Hello World!'));

app.use('/auth', auth);
app.use('/api/vegs', products);


const port=process.env.PORT || 8082;
app.listen(port,()=>console.log(`Server running on port ${port}`));