import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>GoTo Menu</h2>
      <button onClick={() => navigate("/food-items")}>View Food Items</button>
    </div>
  );
}

export default Menu;
