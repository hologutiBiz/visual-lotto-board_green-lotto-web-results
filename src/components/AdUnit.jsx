import "../styles/Ad.css"

import { useEffect } from 'react';

const AdUnit = ({ slot }) => {
    useEffect(() => {
        try {
          // Logic to ensure the script is only pushed once per mount
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          // Silence expected errors during React development
        }
    }, [slot]); // Re-fire if the slot ID changes

    return (
        <div className="ad-wrapper" style={{ margin: '20px 0', textAlign: 'center' }}>
            <ins className="adsbygoogle"
              style={{display: "block"}}
              data-ad-client="ca-pub-3639147338737274"
              data-ad-slot={slot}
              data-ad-format="auto"
              data-full-width-responsive="true">
            </ins>
        </div>
    );
};

export default AdUnit;


