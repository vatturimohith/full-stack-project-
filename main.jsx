import React from "react";
import { createRoot } from "react-dom/client";
import FullstackApp from "./fullstack.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FullstackApp />
  </React.StrictMode>
);

