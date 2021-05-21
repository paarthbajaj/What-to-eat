import React from "react";
import { useGlobalContext } from "../Context";
import Loading from "./Loading";
import Meal from "./Meal";

const MealList = () => {
  const { meal, loading } = useGlobalContext();
  console.log(meal);

  if (loading) return <Loading />;

  if (meal.length < 1) {
    return <h2 className="section-title">No meals found</h2>;
  }

  return (
    <section className="section">
      <h2 className="section-title">Meals</h2>
      <div className="cocktails-center">
        {meal.map((item) => {
          return <Meal key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default MealList;
