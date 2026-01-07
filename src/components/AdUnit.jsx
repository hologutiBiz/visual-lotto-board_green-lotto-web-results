import "../styles/Ad.css"

import { useEffect } from 'react';

const AdUnit = ({ id, position }) => {
  useEffect(() => {
    // Check if Ezoic is loaded and we have an ID
    if (window.ezstandalone && id) {
      window.ezstandalone.cmd.push(function() {
        // Define and show the specific placeholder
        window.ezstandalone.define(id);
        if (!window.ezstandalone.enabled) {
          window.ezstandalone.enable();
          window.ezstandalone.display();
        } else {
          window.ezstandalone.showAds(id);
        }
      });
    }
  }, [id]);

  // Provide a minimum height to prevent Layout Shift (CLS)
  return (
    <div className="ad-unit-wrapper" style={{ minHeight: '250px', margin: '20px 0', textAlign: 'center' }}>
      <div id={`ezoic-pub-ad-placeholder-${id}`}></div>
      {/* Optional: Dev label */}
      <small style={{ color: '#ccc', fontSize: '10px' }}>ADVERTISEMENT</small>
    </div>
  );
};

export default AdUnit;