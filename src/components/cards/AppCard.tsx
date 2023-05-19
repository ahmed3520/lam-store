import React from "react";
import "../css/appcard.css";

interface AppCardProps {
  icon: string;
  appName: string;
  description: string;
}

const AppCard: React.FC<AppCardProps> = ({ icon, appName, description }) => {
  return (
    <div className="app-card">
      <img src={icon} alt={`${appName} icon`} className="app-card-icon" />
      <h3 className="app-card-name">{appName}</h3>
      <p className="app-card-description">{description}</p>
    </div>
  );
};

export default AppCard;
