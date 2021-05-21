import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const SingleMeal = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchMeal = async () => {
      try {
        const response = await fetch(url + id);
        const data = await response.json();
        console.log(data);
        if (data.meals) {
          const {
            strMeal: name,
            strMealThumb: image,
            strArea: region,
            strCategory: category,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
          } = data.meals[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
          ];
          const newMeal = {
            name,
            image,
            region,
            category,
            instructions,
            ingredients,
          };
          setMeal(newMeal);
        } else {
          setMeal(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) return <Loading />;

  if (!meal) return <h2 className="section-title">Oops! No meal to display</h2>;

  const { name, image, region, category, instructions, ingredients } = meal;
  return (
    <section className="section cocktail-section">
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Region: </span>
            {region}
          </p>
          <p>
            <span className="drink-data">Instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </section>
  );
};

export default SingleMeal;
