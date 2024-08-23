// gtm.js
import TagManager from 'react-gtm-module';

const gtmId = process.env.REACT_APP_GTM_ID;

if (!gtmId) {
  console.error('GTM_ID is not defined in environment variables');
}

export const initializeTagManager = () => {
  TagManager.initialize({ gtmId });
};
