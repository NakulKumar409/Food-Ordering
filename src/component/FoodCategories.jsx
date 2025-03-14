import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const foodCategories = [
  {
    name: "Pizza",
    image: "pizza1.jpg",
    description: "Crispy, cheesy, delicious pizzas",
  },
  {
    name: "Burger",
    image: "burger1.jpg",
    description: "Juicy burgers with premium ingredients",

  },
  {
    name: "Cold Drinks",
    image: "coldrink4.jpg",
    description: "Refreshing beverages to cool you down",
  },
  {
    name: "South Food",
    image: "southfood1.jpg",
    description: "Authentic South Indian delicacies",
  },
  {
    name: "Biryani",
    image: "biryani1.jpg",
    description: "Aromatic and flavorful biryanis",
  },
];

const FoodCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section className="food-categories py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Explore Our Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {foodCategories.map((category, index) => (
            <motion.div
              key={category.name}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 300,
              }}>
              <motion.div
                className="relative w-40 h-40 mx-auto mb-4 cursor-pointer"
                onHoverStart={() => setHoveredCategory(category.name)}
                onHoverEnd={() => setHoveredCategory(null)}
                whileHover={{ scale: 1.1 }}>
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-full opacity-20 blur-xl"
                  animate={{
                    scale: hoveredCategory === category.name ? 1.1 : 1,
                    rotate: hoveredCategory === category.name ? 360 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                />
                <img
                  src={`/assets/images/${category.image}`}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-green-500 shadow-xl"
                />
                {hoveredCategory === category.name && (
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <p className="text-sm text-center px-2">
                      {category.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
              <Link
                to={`/menu/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block mt-2 text-lg font-semibold text-gray-800 hover:text-green-600 transition">
                {category.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
