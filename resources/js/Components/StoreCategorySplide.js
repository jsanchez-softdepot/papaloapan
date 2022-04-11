import { Link } from "@inertiajs/inertia-react";
import React from "react";

const CategorySplide = ({ category }) => {
  return (
    <Link href={`/categoria/${category.slug}`} className="caption text-white">
      <h2 className="text-lg font-bold">{category.name}</h2>
      <span className="btn-more mt-5 px-10 py-1 border rounded border-white">Ver Variedad</span>
    </Link>
  );
};

export default CategorySplide;
