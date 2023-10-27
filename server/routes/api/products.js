const express = require('express');
const router = express.Router();
const User=require('../../models/User.js');

router.put('/new/:id', async (req,res) => {
  const newProduct=req.body;
  try{  
    const existingUser=await User.findOneAndUpdate(
      { _id:req.params.id },
      { $push: { products: { $each: [newProduct] }}} 
    );

    if (!existingUser) {
      return res.status(404).json({ error: "You have to log in first!"});
    }
    res.status(200).json({ status: "ok", message: 'Products field updated successfully' });
  }
  catch (error){
    console.error("Error:",error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/',async (req, res) => {
  try {
    const users = await User.find({}, 'products');
    const allProducts = users.reduce((acc, user) => acc.concat(user.products), []);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id',async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProducts = user.products;
    return res.json(userProducts);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id',(req,res) =>{
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product =>res.json({ msg:'Updated successfully'}))
    .catch(err =>
      res.status(400).json({ error:'Unable to update the Database'})
    );
});

router.delete('/:id',(req, res) => {
  Product.findByIdAndRemove(req.params.id, req.body)
    .then(book=>res.json({ mgs: 'Vegetable entry deleted successfully'}))
    .catch(err=>res.status(404).json({ error: 'No such a Vegetable'}));
});

module.exports=router;