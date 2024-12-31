import React from "react";
import Navbar from "./Components/Navbar.jsx";
import Filter from "./Components/Filter.jsx";
import Cards from "./Components/Cards.jsx";
import Spinner from "./Components/Spinner.jsx";
import { apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  
  const [courses, setCourses] = useState([]); // returns an array 
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(["All"]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const output = await res.json();

      // Save data
      setCourses(output.data);
      setCategory("All");
    } catch (err) {
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []); // only once after the first render 

  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
      <ToastContainer />
      <div>
        <Navbar />
      </div>

      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            loading ? (
              <Spinner />
            ) : (
              <Cards courses={courses} category={category} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
