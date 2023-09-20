const express=require('express');
const connectDB=require('./config/db');
const cors = require('cors');
// const books = require('./routes/api/books');
const products = require('./routes/api/products');
// const register = require('./routes/api/register');
const app=express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/',(req,res)=>res.send('Hello World!'));
// app.use('/api/books', books);
app.use('/api/vegs', products);
// app.use('/user', register);

const port=process.env.PORT || 8082;
app.listen(port,()=>console.log(`Server running on port ${port}`));