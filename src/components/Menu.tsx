import React, { useEffect, useRef } from "react";
import "./menu.css";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  username: string;
  image: string;
}

const MenuSidebar = ({
  showSidebar,
  setShowSidebar,
  username,
  image,
}: SidebarProps) => {
  const sidebarRef = useRef(null);
  const handleClickOutside = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (
      sidebarRef.current &&
      !(sidebarRef.current as Element).contains(targetNode)
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
    <div className={`sidebar ${showSidebar ? "show" : ""}`} ref={sidebarRef}>
      <div className="user">
        <img src={image} alt={username} />
        <h3>{username}</h3>
      </div>
      <div className="tabs">
        <ul>
          <li>Tab 1</li>
          <li>Tab 2</li>
          <li>Tab 3</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuSidebar;
