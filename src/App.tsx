import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/SideBar";
import ChatInterface from "./chat/Chat";
import ChatInterfaceRouter from "./routers/ChatInterface";
import {
  Routes,
  Route,
  useParams,
  Link,
  Outlet,
  BrowserRouter as Router,
} from "react-router-dom";
import Mainsidebar from "./components/Mainsidebar";
import ErrorPage from "./components/error-page";
import Store from "./pages/store";

function App() {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/store" element={<Store />} />
        </Routes>

        <Mainsidebar />
      </div>
    </>
  );
}

export default App;
