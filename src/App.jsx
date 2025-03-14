import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import FoodItems from "./component/FoodItems";
import OrderSummary from "./component/OrderSummary";
import Contact from "./component/Contact";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Hero from "./component/Hero";
import RestaurantPage from "./component/RestaurantPage";
import About from "./component/About";
import Location from "./component/Location";
import Footer from "./component/Footer";
import SearchResults from "./component/SearchResults";
import FoodCategories from "./component/FoodCategories";
import PaymentPage from "./component/PaymentPage";
import OrderConfirmation from "./component/OrderConfirmation";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        {/* Added pt-20 to account for fixed navbar height */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/menu" element={<FoodItems />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/location" element={<Location />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            {/* Redirect any unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />h
            
          </Routes>
          
          {/* New Sections */}
          <FoodCategories />
          <About />
          <Location />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;