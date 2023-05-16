import React from "react";

interface AppProps {
  name: string;
  description: string;
  icon: string;
  publisherName: string;
  isVerified: boolean;
}

const AppCard: React.FC<AppProps> = ({
  name,
  description,
  icon,
  publisherName,
  isVerified,
}) => {
  return (
    <div>
      <img src={icon} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Published by: {publisherName}</p>
      {isVerified && <span>Verified</span>}
    </div>
  );
};

export default AppCard;
