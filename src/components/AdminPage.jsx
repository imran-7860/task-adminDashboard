import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelPopUp from "./ModelPopUp";

const AdminPage = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [open , setOpen] = useState(false)
  const navigate = useNavigate();

  const [editData , setEditData] = useState({
    productName: "",
    quantity: "",
    description: "",
    price: "",
    id:""
  })

  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (!sessionStorage.getItem("email")) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getProducts");
        console.log(response);
        if (response.data.status) {
          setData(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate]);

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form data submitted:", formData);
      // You can add form submission logic here (e.g., API call)

      const response = await axios.post(
        "http://localhost:3001/createproduct",
        formData
      );

      if (response.data.status) {
        alert("added succfully");
        setData([...data, response.data.data]);
        // setShow(false)
      }
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
    setShow(false);
  };

  const handleEdit = (doc) => {
    setEditData({
      productName: doc.productName,
      quantity: doc.quantity,
      description: doc.description,
      price: doc.price,
      id : doc._id
    })
    setOpen(true)
  }

  return (
    <div>
      <div className="flex justify-end container mx-auto px-1 ">
        <button
          className={` text-white px-4 py-2 mt-2 rounded ${
            show ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={handleShow}
        >
          {show ? "Close" : "Add Product"}
        </button>
      </div>
      {show && (
        <div className="flex justify-center items-start mx-auto mt-10 bg-gray-200 border shadow-xl container  md:w-full ">
          <form
            className="flex flex-col justify-center items-center p-10 md:flex-row gap-3 "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              className="py-2 px-5 outline-none border-blue-700  w-full"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="py-2 px-5 outline-none border-blue-700  w-full"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="py-2 px-5 outline-none border-blue-700  w-full"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="py-2 px-5 outline-none border-blue-700  w-full"
              required
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="">
        <div>
          {data.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
              {data.map((x, i) => {
                return (
                  <div key={i} className="border shadow-xl rounded-lg p-5  ">
                    <ul>
                      <li>Product Name : {x.productName}</li>
                      <li>Quantity : {x.quantity}</li>
                      <li>Description : {x.description}</li>
                      <li>Price : {x.price}</li>
                    </ul>
                    <div className="flex justify-between "> 
                      <button className="border px-2 py-1 rounded-lg mt-2 hover:bg-blue-400 hover:text-white ">
                        Buy now
                      </button>
                      <button className="border px-2 py-1 rounded-lg mt-2 hover:bg-blue-400 hover:text-white " onClick={() => handleEdit(x)}>
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No product available</div>
          )}
        </div>
      </div>

      <ModelPopUp open={open} setOpen={setOpen} editData={editData} />
    </div>
  );
};

export default AdminPage;
