const express = require('express');
const router = express.Router();
const User=require('../../models/User.js');

// router.put('/new/:id', async (req,res) => {
//   const newProduct=req.body;
//   try{  
//     const existingUser=await User.findOneAndUpdate(
//       { _id:req.params.id },
//       { $push: { products: { $each: [newProduct] }}} 
//     );

//     if (!existingUser) {
//       return res.status(404).json({ error: "You have to log in first!"});
//     }
//     res.status(200).json({ status: "ok", message: 'Products field updated successfully' });
//   }
//   catch (error){
//     console.error("Error:",error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


router.post('/new/:id', async (req, res) => {
  const newProduct = req.body;

  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }


    res.status(200).json({ status: "ok", message: 'Product updated or created successfully' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/new/:id', async (req, res) => {
  const newProduct = req.body;

  try {
    const existingUser = await User.findOne({id:req.params.id});

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product already exists
    const existingProduct = existingUser.products.find(product => product.id === newProduct.id);

    if (existingProduct) {
      // Update an existing product
      existingProduct.name = newProduct.name;
      existingProduct.price = newProduct.price;
      existingProduct.description = newProduct.description;
    } else {
      // Create a new product
      existingUser.products.push(newProduct);
    }

    await existingUser.save();

    res.status(200).json({ status: "ok", message: 'Product updated or created successfully' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});




router.get('/all',async (req, res) => {
  try {
    const users = await User.find({}, 'products');
    const allProducts = users.reduce((acc, user) => acc.concat(user.products), []);
    console.log(typeof allProducts);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// server
// router.get('/all', async (req, res) => {
//   try {
//     const { name, category, maxPrice } = req.query;
//     let filter = {};

//     if (name) {
//       filter.name = name;
//     }
//     if (category) {
//       filter.category = category;
//     }
//     if (maxPrice) {
//       filter.price = { $lte: parseFloat(maxPrice) };
//     }

//     const users = await User.find(filter, 'products');
//     const allProducts = users.reduce((acc, user) => acc.concat(user.products), []);

//     res.json(allProducts);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



router.get('/all/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const users = await User.find({}, 'products');
    const foundProduct = users.reduce((acc, user) => {
      const product = user.products.find((product) => product.id === productId);
      if (product) {
        acc = product;
      }
      return acc;
    }, null);

    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
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




router.delete('/:userId/:productId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productIndex = user.products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    user.products.splice(productIndex, 1);

    await user.save();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports=router;