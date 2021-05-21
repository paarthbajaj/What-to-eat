import React from "react";
import { Link } from "react-router-dom";

const Meal = ({ name, id, category, image, region }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{category}</h4>
        <p>{region}</p>
        <Link to={`/meal/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Meal;
