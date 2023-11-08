const express=require('express');
const connectDB=require('./config/db');
const cors=require('cors');

const products=require('./routes/api/products');
const conversations = require('./routes/api/conversations');
const messages = require('./routes/api/messages');
const auth=require('./routes/api/auth');
const admin=require('./routes/api/admin');
const cart=require('./routes/api/cart');

const app=express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
// app.use(express.json({ extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.get('/',(req,res)=>res.send('Hello World!'));

app.use('/admin', admin);
app.use('/auth', auth);
app.use('/products', products);
app.use('/add2cart', cart);
app.use('/conversations', conversations);
app.use('/messages', messages);

const port=process.env.PORT || 8082;
app.listen(port,()=>console.log(`Server running on port ${port}`));