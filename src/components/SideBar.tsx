import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { ReactComponent as Bar } from "../assets/bar.svg";

type Props = {
  messages: Array<Message>;
};

type Message = {
  text: string;
  sender: string;
  timestamp: string;
};

const Sidebar: React.FC<Props> = ({ messages }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
      setShowSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {isMobileScreen ? (
        <div className="header">
          <button className="sidebar-toggle" onClick={handleToggleSidebar}>
            <Bar />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div
        className={`sidebar-container ${
          isMobileScreen && !showSidebar ? "hidden-sidebar" : ""
        }`}
      >
        {showSidebar || !isMobileScreen ? (
          <div className={`sidebar-content ${showSidebar ? "" : "hidden"}`}>
            <div className="">CHAT MESSAGES</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Sidebar;
