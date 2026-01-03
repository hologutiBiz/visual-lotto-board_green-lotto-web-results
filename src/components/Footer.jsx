import "../styles/Footer.css"

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <h3 className="footer-title">Visual Lotto Board</h3>
                    <p className="footer-subtitle">...Your lotto Result, Material, Sales and Payment companion</p>
                    
                    {/* Disclaimer Section */}
                    <div className="footer-disclaimer">
                        <p className="disclaimer-text">
                            <strong>Disclaimer:</strong> This website is an independent platform providing Green Lotto results 
                            for informational purposes only. We are not affiliated with, endorsed by, or officially connected 
                            to Green Lotto Company. Our relationship with Green Lotto company is limited to being a Principal Agent 
                            (providing sales terminals) and Sales Agent outlets. Results displayed are for reference only. 
                            Please verify winning numbers with official Green Lotto company.
                        </p>
                    </div>
                    
                    <div className="footer-links">
                        <a className="footer-link" href="https://visuallottoboard.com/about" target="_blank" rel="noopener noreferrer">About</a>
                        <a className="footer-link" href="https://visuallottoboard.com/policies-center" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        <a className="footer-link" href="https://visuallottoboard.com/contact" target="_blank" rel="noopener noreferrer">Contact</a>
                    </div>
                    
                    <p className="footer-copyright">© 2025 Visual Lotto Board. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;