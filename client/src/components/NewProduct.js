import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCloudUpload } from "react-icons/bs";
import { imgtobase } from "../utility/imgtobase";

const NewProduct = () => {
  const id = useSelector((state) => state.user._id);
  console.log(id);
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(data);
  };

  const uploadImage = async (e) => {
    const data = await imgtobase(e.target.files[0]);
    //console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    //console.log(data);
    const { name, image, category, price } = data;
    if (name && image && category && price) {
      try {
        const response = await fetch(`http://localhost:8082/products/new/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const sdata = await response.json();

        if (sdata.status === "ok") {
          alert("Post Successful");
          //navigate("/Login");
          setData(() => {
            return {
              name: "",
              category: "",
              image: "",
              price: "",
              description: "",
            };
          });
        } else {
          alert(sdata.err || "An error occurred during Posting.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during Posting. Please try again later.");
      }
    } else {
      alert("Enter All Fields");
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handlesubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 my-1"
          onChange={handleonChange}
          value={data.name}
        ></input>
        <label htmlFor="category"> Category</label>
        <select
          name="category"
          className="bg-slate-200 my-1 "
          id="category"
          onChange={handleonChange}
          value={data.category}
        >
          <option>Fruits</option>
          <option>Vegetable</option>
        </select>
        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" alt="Product" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type="file"
              id="image"
              onChange={uploadImage}
              className="hidden"
              accept="image/*"
              // value={data.image}
            />
          </div>
        </label>
        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 my-1"
          name="price"
          onChange={handleonChange}
          value={data.price}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          onChange={handleonChange}
          rows="2"
          className="bg-slate-200 my-1 resize-none"
          value={data.description}
        ></textarea>
        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow my-2">
          Save
        </button>
      </form>
    </div>
  );
};
export default NewProduct;