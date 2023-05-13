import React from "react";
import "./css/store.css";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

const Store = () => {
  return (
    <div className="store">
      <div className="store-wr">
        <div className="banner">
          <img src="banner.jpg" alt="Banner" />
          <div className="header-cont">
            <div className="header-cont-text">
              <h2>Discover the latest AI apps for Windows</h2>
            </div>
            <div className="app-search">
              <div className="search-container">
                <SearchIcon />
                <input placeholder="Search for apps" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
