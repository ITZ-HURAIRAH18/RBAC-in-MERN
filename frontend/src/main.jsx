import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
// import Form from "./form.jsx";
// import AdminPanel from "./AdminPanel";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
   
    {/* <Form /> */}
    {/* <AdminPanel /> */}
  </StrictMode>
);
