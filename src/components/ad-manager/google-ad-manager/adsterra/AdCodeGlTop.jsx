import { useEffect } from 'react';

const AdCodeGlTop = ({ divId = 'div-gpt-ad-1776532597317-0' }) => {
  useEffect(() => {
    // We only call display here because the Slot was already 
    // defined in your index.html header script.
    if (window.googletag && window.googletag.apiReady) {
      window.googletag.cmd.push(() => {
        window.googletag.display(divId);
      });
    }
  }, [divId]);

  return (
    <div className="gam-ad-wrapper" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div id={divId} style={{ minWidth: '300px', minHeight: '50px' }}></div>
    </div>
  );
};

export default AdCodeGlTop;