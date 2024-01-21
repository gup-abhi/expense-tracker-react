import { useState, useEffect, createContext } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const notify = (message) => {
    toast(message);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/category`);
        console.log(`categories - ${JSON.stringify(response.data)}`);
        setCategories(response.data);
        setCategory(response.data[response.data.length - 1].id);
      } catch (error) {
        notify(error.response.data.message);
        console.error(error);
      }
    };

    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        category,
        setCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
