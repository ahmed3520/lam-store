import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/SideBar";
import ChatInterface from "./chat/Chat";
import ChatInterfaceRouter from "./routers/ChatInterface";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainsidebar from "./components/Mainsidebar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatInterfaceRouter />,
  },
]);
function App() {
  return (
    <>
      <div className="wrapper">
        <RouterProvider router={router} />
      </div>
      <Mainsidebar />
    </>
  );
}

export default App;
