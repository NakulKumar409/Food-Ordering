import { motion } from "framer-motion";
import React, { useState } from "react";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="about-section bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="about-content">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Culinary Journey
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Welcome to our restaurant, a culinary haven where passion meets
              flavor! We are dedicated to creating an unforgettable dining
              experience that celebrates the rich tapestry of Indian cuisine.
              Our chefs meticulously craft each dish, blending traditional
              recipes with modern techniques, ensuring every bite tells a story
              of authenticity and innovation. From street-style delicacies to
              royal feast inspirations, we bring the diverse flavors of India to
              your table.
            </p>
            <div className="highlights flex space-x-4 mt-6">
              <div className="highlight text-center">
                <h3 className="text-2xl font-bold text-green-600">10+</h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="highlight text-center">
                <h3 className="text-2xl font-bold text-green-600">50+</h3>
                <p className="text-gray-600">Unique Dishes</p>
              </div>
              <div className="highlight text-center">
                <h3 className="text-2xl font-bold text-green-600">500+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="about-image flex justify-center items-center">
            <motion.div
              className="relative w-80 h-80"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}>
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full opacity-20 blur-2xl"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              />
              <motion.img
                src="nakul1.jpg"
                alt="Nakul's Photo"
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-green-500 shadow-2xl"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  rotateY: isHovered ? 20 : 0,
                  rotateX: isHovered ? -10 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
                whileHover={{
                  rotate: [0, 5, -5, 0],
                }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-green-500 rounded-full animate-pulse"
                style={{
                  animationDuration: "3s",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
