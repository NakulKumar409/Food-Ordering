import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuCategories = {
  pizza: [
    {
      id: "pizza_001",
      name: "Classic Cheese Margherita",
      description: "Timeless blend of fresh mozzarella and basil on a crispy thin crust.",
      price: 249,
      image: "pizza1.jpg",
      discount: 5,
    },
    {
      id: "pizza_002",
      name: "Spicy Pepperoni Delight",
      description: "Zesty pepperoni slices dancing on a bed of melted cheese and tangy sauce.",
      price: 379,
      image: "pizza2.jpg",
      discount: 12,
    },
    {
      id: "pizza_003",
      name: "Loaded Veggie Supreme",
      description: "A colorful medley of farm-fresh vegetables bursting with flavor and nutrition.",
      price: 329,
      image: "pizza3.jpg",
      discount: 8,
    },
    {
      id: "pizza_004",
      name: "Meat Lovers Extravaganza",
      description: "Carnivore's dream with a symphony of premium meats and smoky seasonings.",
      price: 399,
      image: "pizza4.jpg",
      discount: 15,
    },
  ],
  burgers: [
    {
      id: "burger_001",
      name: "Gourmet Cheese Explosion",
      description: "Molten cheese cascading over a perfectly grilled patty with caramelized edges.",
      price: 229,
      image: "burger1.jpg",
      discount: 7,
    },
    {
      id: "burger_002",
      name: "Garden Fresh Veggie Delight",
      description: "Crisp vegetables and a wholesome plant-based patty, packed with natural goodness.",
      price: 199,
      image: "burger2.jpg",
      discount: 10,
    },
    {
      id: "burger_003",
      name: "Crispy Vegetable Crunch",
      description: "A textural marvel with golden-fried vegetables and a light, herbal seasoning.",
      price: 209,
      image: "burger3.jpg",
      discount: 6,
    },
    {
      id: "burger_004",
      name: "Protein Power Veggie Burger",
      description: "High-protein plant patty with a robust blend of grains and nutrient-rich ingredients.",
      price: 219,
      image: "burger4.jpg",
      discount: 9,
    },
    {
      id: "burger_005",
      name: "Spicy Jalapeño Veggie Blast",
      description: "A fiery kick of jalapeños dancing with a cool, creamy vegetable patty.",
      price: 239,
      image: "burger5.jpg",
      discount: 11,
    },
    {
      id: "burger_006",
      name: "Truffle Mushroom Veggie Burger",
      description: "Luxurious truffle-infused mushrooms nestled in a gourmet vegetable patty.",
      price: 259,
      image: "burger6.jpg",
      discount: 8,
    },
    {
      id: "burger_007",
      name: "Mediterranean Veggie Fusion",
      description: "A culinary journey with herbs, olives, and a sun-kissed vegetable patty.",
      price: 249,
      image: "burger7.jpg",
      discount: 12,
    },
    {
      id: "burger_008",
      name: "Classic Garden Veggie Stack",
      description: "Timeless vegetable burger with a harmonious blend of garden-fresh ingredients.",
      price: 189,
      image: "burger1.jpg",
      discount: 5,
    },
  ],
  colddrinks: [
    {
      id: "drink_001",
      name: "Classic Cola Refresh",
      description: "Iconic cola with a perfect balance of sweetness and refreshing fizz.",
      price: 45,
      image: "coldrink1.jpg",
      discount: 3,
    },
    {
      id: "drink_002",
      name: "Sparkling Cola Twist",
      description: "A vibrant twist on the classic cola with a hint of citrusy excitement.",
      price: 49,
      image: "coldrink1.jpg",
      discount: 5,
    },
    {
      id: "drink_003",
      name: "Citrus Cola Burst",
      description: "Effervescent cola with a zesty citrus punch that awakens your senses.",
      price: 52,
      image: "coldrink3.jpg",
      discount: 7,
    },
    {
      id: "drink_004",
      name: "Zero Sugar Cola",
      description: "Guilt-free refreshment with zero sugar and full-bodied cola flavor.",
      price: 55,
      image: "coldrink4.jpg",
      discount: 10,
    },
    {
      id: "drink_005",
      name: "Dark Cola Intense",
      description: "Rich, deep cola with a bold flavor profile for the true cola connoisseur.",
      price: 48,
      image: "coldrink5.jpg",
      discount: 4,
    },
    {
      id: "drink_006",
      name: "Energy Boost Cola",
      description: "Invigorating cola packed with an extra energy-enhancing kick.",
      price: 59,
      image: "coldrink6.jpg",
      discount: 12,
    },
    {
      id: "drink_007",
      name: "Smooth Caffeine-Free Cola",
      description: "All the cola flavor without the caffeine, perfect for a relaxed moment.",
      price: 47,
      image: "coldrink7.jpg",
      discount: 6,
    },
    {
      id: "drink_008",
      name: "Light & Crisp Cola",
      description: "A lighter, more delicate cola experience with a crisp, clean finish.",
      price: 51,
      image: "coldrink8.jpg",
      discount: 8,
    },
    {
      id: "drink_009",
      name: "Refreshing Cola Splash",
      description: "A cool, revitalizing cola that brings a splash of joy to your day.",
      price: 53,
      image: "coldrink5.jpg",
      discount: 9,
    },
  ],
  South_Food: [
    {
      id: "south_001",
      name: "Traditional Crispy Dosa",
      description: "Thin, golden-brown crepe with a perfect crunch, served with classic accompaniments.",
      price: 89,
      image: "southfood1.jpg",
      discount: 7,
    },
    {
      id: "south_002",
      name: "Soft Idli with Spicy Sambar",
      description: "Pillowy steamed rice cakes paired with a fiery, aromatic sambar.",
      price: 79,
      image: "southfood2.jpg",
      discount: 5,
    },
    {
      id: "south_003",
      name: "Masala Dosa with Coconut Chutney",
      description: "Crisp dosa filled with spiced potato masala, served with creamy coconut chutney.",
      price: 109,
      image: "southfood3.jpg",
      discount: 12,
    },
    {
      id: "south_004",
      name: "Crispy Uttapam Combo",
      description: "Thick, fluffy pancake topped with fresh vegetables and tangy flavors.",
      price: 99,
      image: "southfood4.jpg",
      discount: 8,
    },
    {
      id: "south_005",
      name: "Golden Fried Vada",
      description: "Crispy, golden-brown lentil fritters with a soft, spiced interior.",
      price: 69,
      image: "southfood5.jpg",
      discount: 6,
    },
    {
      id: "south_006",
      name: "Crisp Rava Dosa Special",
      description: "Delicate, lacy dosa made from semolina, offering a unique textural experience.",
      price: 119,
      image: "southfood6.jpg",
      discount: 10,
    },
  ],
  biryani: [
    {
      id: "biryani_001",
      name: "Classic Chicken Biryani",
      description: "Aromatic rice layered with tender chicken and a blend of traditional spices.",
      price: 279,
      image: "./biryani4.jpg",
      discount: 8,
    },
    {
      id: "biryani_002",
      name: "Royal Chicken Biryani Feast",
      description: "Luxurious biryani with premium chicken and an elaborate spice symphony.",
      price: 329,
      image: "./biryani5.jpg",
      discount: 12,
    },
    {
      id: "biryani_003",
      name: "Spicy Chicken Biryani Deluxe",
      description: "A fiery rendition of biryani with an extra kick of bold, intense flavors.",
      price: 299,
      image: "./biryani6.jpg",
      discount: 10,
    },
    {
      id: "biryani_004",
      name: "Premium Chicken Biryani Platter",
      description: "Exquisite biryani crafted with the finest ingredients and meticulous preparation.",
      price: 349,
      image: "./biryani7.jpg",
      discount: 15,
    },
    {
      id: "biryani_005",
      name: "Supreme Chicken Biryani Experience",
      description: "The pinnacle of biryani craftsmanship, offering an unparalleled culinary journey.",
      price: 369,
      image: "./biryani8.jpg",
      discount: 13,
    },
  ],
};

const FoodItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const [filteredItems, setFilteredItems] = useState(menuCategories.pizza);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");

    if (categoryParam && menuCategories[categoryParam]) {
      setSelectedCategory(categoryParam);
      setFilteredItems(menuCategories[categoryParam]);
    }
  }, [location.search]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredItems(menuCategories[category]);
    navigate(`?category=${category}`);
  };

  const addToCart = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );
    let updatedCart = existingItem
      ? selectedItems.map((selectedItem) =>
          selectedItem.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        )
      : [...selectedItems, { ...item, quantity: 1 }];

    setSelectedItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: { cart: updatedCart } })
    );
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = selectedItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setSelectedItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: { cart: updatedCart } })
    );
  };

  const isItemInCart = (item) =>
    selectedItems.some((selectedItem) => selectedItem.id === item.id);

  const proceedToCart = () => {
    navigate("/order-summary", { state: { cart: selectedItems } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4 overflow-x-auto">
          {Object.keys(menuCategories).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              {category.replace("_", " ").charAt(0).toUpperCase() +
                category.replace("_", " ").slice(1)}
            </button>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <button
            onClick={proceedToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Cart ({selectedItems.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image")
              }
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="text-orange-500 font-semibold">
                  ₹{item.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">
                  {item.discount}% OFF
                </span>
                {isItemInCart(item) ? (
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors">
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 italic mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { menuCategories };
export default FoodItems;
