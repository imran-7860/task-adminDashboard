import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <div>{data.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {data.map((x,i)=>{
        return <div key={i} className="border shadow-xl rounded-lg p-5  ">
          <ul>
            <li >Product Name : {x.productName}</li>
            <li >Quantity : {x.quantity}</li>
            <li >Description : {x.description}</li>
            <li >Price : {x.price}</li>
            
            
          </ul>
          <button className="border px-2 py-1 rounded-lg mt-2 hover:bg-blue-400 hover:text-white ">Buy now</button>
        </div>
      })}
    </div> : <div>No product available</div>}</div>
  );
};

export default Home;
