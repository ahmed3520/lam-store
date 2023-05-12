import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Burger } from "../assets/burger.svg";
import { ReactComponent as Store } from "../assets/store.svg";
import { ReactComponent as Apps } from "../assets/apps.svg";
import "./mainsidebar.css";
import MenuSidebar from "./Menu";

const Mainsidebar = () => {
  const sidebarTriggerRef = useRef(null);
  const sidebarRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    console.log("toggleSidebar called", showSidebar);
    setShowSidebar(!showSidebar);
    console.log("toggleSidebar pressed", showSidebar);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (
      sidebarRef.current &&
      !(sidebarRef.current as Element).contains(targetNode) &&
      (!sidebarTriggerRef.current ||
        !(sidebarTriggerRef.current as Element).contains(targetNode))
    ) {
      console.log("Clicked outside the sidebar");
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="main-sidebar">
      <div className="main-sidebar-wr">
        <div
          className="icon-wrapper btn-click"
          onClick={toggleSidebar}
          ref={sidebarTriggerRef}
        >
          <Burger />
        </div>
        <div className="icon-wrapper">
          <Store />
          <span>Store</span>
        </div>
        <div className="icon-wrapper">
          <Apps />
          <span>Apps</span>
        </div>
      </div>

      <MenuSidebar
        showSidebar={showSidebar}
        username="John Doe"
        image="/logo512.png"
        setShowSidebar={setShowSidebar}
      />
    </div>
  );
};

export default Mainsidebar;
