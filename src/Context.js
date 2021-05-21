import React, { useState, useEffect, useContext, useCallback } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [meal, setMeal] = useState([]);

  const fetchMeal = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url + searchTerm);
      const data = await response.json();
      console.log(data);
      const { meals } = data;
      if (meals) {
        const newMeal = meals.map((item) => {
          const { idMeal, strMeal, strCategory, strMealThumb, strArea } = item;
          return {
            id: idMeal,
            name: strMeal,
            category: strCategory,
            image: strMealThumb,
            region: strArea,
          };
        });
        setMeal(newMeal);
      } else {
        setMeal([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchMeal();
  }, [searchTerm, fetchMeal]);

  return (
    <AppContext.Provider value={{ loading, meal, setSearchTerm }}>
      {" "}
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
