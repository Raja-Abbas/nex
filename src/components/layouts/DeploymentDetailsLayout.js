import React, { useState, useEffect } from 'react';
import DeploymentDetails from '../DeploymentDetails';
import DetailsTabSidebar from '../DetailsTabSidebar';
import BuildTabSidebar from '../BuildTabSidebar';
import DeployTabSidebar from '../DeployTabSidebar';
import ChatbotTabSidebar from '../ChatbotTabSidebar';
import { BuildlogsData, DeploylogsData } from '../../constants/Framework';

const Layout = ({ toggleBuildPageDetailsHide, selectedCard }) => {
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
      if (logIndex < BuildlogsData.length) {
        setLogs((prevLogs) => [...prevLogs, BuildlogsData[logIndex]]);
        logIndex += 1;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!showLayout) {
    return null;
  }
  
  return (
    <div className="rounded-[10px] animation-detailsSlideIn">
      <div className="bg-background pt-[20px]">
        <DeploymentDetails
          handleMenuClick={handleMenuClick}
          hideLayout={hideLayout}
          selectedCard={selectedCard}
          toggleBuildPageDetailsHide={toggleBuildPageDetailsHide}
        />
      </div>
      <div>
        {selectedMenu === 'Details' && <DetailsTabSidebar selectedCard={selectedCard} />}
        {selectedMenu === 'Build' && <BuildTabSidebar logs={logs} />}
        {selectedMenu === 'Deploy' && <DeployTabSidebar logs={logs} />}
        {selectedMenu === 'Star' && <ChatbotTabSidebar />}
      </div>
    </div>
  );
};

export default Layout;
