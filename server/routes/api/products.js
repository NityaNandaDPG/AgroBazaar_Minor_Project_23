const express = require('express');
const router = express.Router();
const User=require('../../models/User.js');

router.put('/new', async (req,res) => {
  const newProduct=req.body;
  try{  
    const existingUser=await User.findOneAndUpdate(
      { _id:req.body.id },
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
    // Use Mongoose to fetch all users
    const users = await User.find({}, 'products');

    // Extract and send the products as a JSON response
    const allProducts = users.reduce((acc, user) => acc.concat(user.products), []);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id',(req, res) => {
  Product.findById(req.params.id)
    .then(product=>res.json(product))
    .catch(err=>res.status(404).json({ nobookfound: 'No Vegetables found' }));
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