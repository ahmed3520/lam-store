import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/SideBar";
import ChatInterface from "./chat/Chat";
function App() {
  return (
    <div className="wrapper">
      <Sidebar messages={[]}></Sidebar>

      <ChatInterface />
    </div>
  );
}

export default App;
