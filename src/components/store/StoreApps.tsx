import React from "react";
import { getAppDataForStore } from "../../utils/getAppDataForStore";
import AppCard from "../cards/AppCard";
import { app } from "../../firebase";
import "../css/store.css";

const StoreApps = () => {
  const apps = getAppDataForStore();
  return (
    <div className="apps-wr">
      <div className="apps-cont">
        {apps.length > 0 ? (
          apps.map((app_card) => {
            return (
              <AppCard
                key={app_card.name_of_app}
                icon={app_card.logo_url}
                appName={app_card.name_of_app}
                description={app_card.description_of_app}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StoreApps;
