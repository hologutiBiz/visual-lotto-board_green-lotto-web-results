// src/components/ad-manager/AppPromoBanner.jsx

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import "../../styles/ad-manager/AppPromoBanner.css"

export default function AppPromoBanner() {
    const [showAppBanner, setShowAppBanner] = useState(false);

    useEffect(() => {
        // 1. Only display on android devices
        const isAndroid = /Android/i.test(navigator.userAgent);

        // 2. Suppress for 7 days if dismmissed
        const dismmissedTime = localStorage.getItem("vlb_greenlotto_banner_dismissed");
        const coolingPeriod = 7 * 24 * 60 * 60 * 1000;
        const isCooledDown = !dismmissedTime || (Date.now() - Number(dismmissedTime) > coolingPeriod);

        if (isAndroid && isCooledDown) {
            setShowAppBanner(true);
        }
    }, []);

    const handleDismissBanner = (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem("vlb_greenlotto_banner_dismissed", Date.now().toString());
        setShowAppBanner(false);
    }

    const handleDownloadTrack = () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'internal_campaign_click',
                campaign_name: 'green_lotto_header_banner',
                campaign_placement: 'web_header_child'
            });
        }
    };

    if (!showAppBanner) return null;

    const playStoreUrl = "https://play.google.com/store/apps/details?id=com.visuallottoboard.greenlottoresult";

    return (
        <div className="app-promo-banner">
            <button className="banner-close-btn" onClick={handleDismissBanner} aria-label="Close promotion banner">×</button>
            <div className="banner-app-info">
                <img 
                    src="https://res.cloudinary.com/ddatfadov/image/upload/v1749649983/VLB_logo_gpiyzr.png" 
                    alt="VLB App Icon" 
                    className="banner-app-logo"
                />
                <div className="banner-text">
                    <p className="banner-title">Visual Lotto Board App</p>
                    <p className="banner-subtitle">Fast results & mobile charts</p>
                </div>
            </div>
            <a 
                href={playStoreUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="banner-install-btn"
                onClick={handleDownloadTrack}
            >
                <Download size={13} style={{ marginRight: '3px' }} />
                INSTALL
            </a>
        </div>
    );
}