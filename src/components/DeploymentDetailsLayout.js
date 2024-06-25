import React, { useState, useEffect } from 'react';
import DeploymentDetails from './DeploymentDetails';
import DetailsComponent from './DetailsComponent';
import BuildComponent from './BuildComponent';
import StarComponent from './StarComponent';
import { logsData } from '../constants/Framework';

const Layout = ({ toggleBuildPageDetailsHide }) => {
  const [selectedMenu, setSelectedMenu] = useState('Details');
  const [logs, setLogs] = useState([]);
  const [showLayout, setShowLayout] = useState(true);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const hideLayout = () => {
    setShowLayout(false);
  };

  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < logsData.length) {
        setLogs((prevLogs) => [...prevLogs, logsData[logIndex]]);
        logIndex += 1;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!showLayout) {
    return null;
  }
  console.log(selectedMenu);

  return (
    <div className="rounded-[10px] animation-detailsSlideIn">
      <div className="bg-background pt-[20px]">
        <DeploymentDetails
          handleMenuClick={handleMenuClick}
          hideLayout={hideLayout}
          toggleBuildPageDetailsHide={toggleBuildPageDetailsHide}
        />
      </div>
      <div>
        {selectedMenu === 'Details' && <DetailsComponent />}
        {selectedMenu === 'Build' && <BuildComponent logs={logs} />}
        {selectedMenu === 'Star' && <StarComponent />}
      </div>
    </div>
  );
};

export default Layout;
