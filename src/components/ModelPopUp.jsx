import axios from "axios";
import React, { useEffect, useState } from "react";

const ModelPopUp = ({ open, setOpen, editData }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        productName: editData.productName,
        quantity: editData.quantity,
        description: editData.description,
        price: editData.price
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    
      // You can add form submission logic here (e.g., API call)

      const response = await axios.put(
        `http://localhost:3001/updateProduct/${editData.id}`,
        formData
      );

      if (response.data.status) {
        alert("Updated Sucessfully");
        // Close the modal after submission
        setOpen(false);
      }
      console.log("Form data submitted:", formData);
    } catch (err) {
      console.log(err);
    }

    // Reset form after submission
    setFormData({
      productName: "",
      quantity: "",
      description: "",
      price: "",
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-40">
      <form
        className="flex flex-col justify-center items-center p-10 bg-gray-200 gap-3 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <p>Edit Product</p>
        <input
          type="text"
          name="productName"
          placeholder="Enter product name"
          value={formData.productName}
          onChange={handleChange}
          className="py-2 px-5 outline-none border-blue-700 w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="py-2 px-5 outline-none border-blue-700 w-full"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          className="py-2 px-5 outline-none border-blue-700 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          className="py-2 px-5 outline-none border-blue-700 w-full"
          required
        />
        <div className="flex justify-center items-center gap-3">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModelPopUp;
