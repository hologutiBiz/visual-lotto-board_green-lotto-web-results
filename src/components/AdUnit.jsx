import "../styles/Ad.css"

const AdUnit = ({ position }) => {
    return (
        <div className="ad-unit">
            <p className="ad-label">Ad Space - {position}</p>
            <p className="ad-sublabel">Ezoic/AdSense will be placed here</p>
        </div>
    );
};

export default AdUnit;