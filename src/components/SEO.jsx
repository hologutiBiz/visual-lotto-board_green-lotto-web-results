import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, url, ogImage}) => {
    const siteName = 'Green Lotto Results';
    const siteOwner = 'Powered by Visual Lotto Board';
    const baseUrl = 'https://green-lotto-result.visuallottoboard.com';
    const defaultDescription = "Check today's Green Lotto today results for all games. Real-time winning and machine number for Naija Vag, Dream Number, Odogwu, UNLIMITED, Wazobia, Destiny, Faaji, Champion.";
    const defaultImage = '';

    const fullTitle = title ? `${siteName} | ${siteOwner}` : siteName;
    const metaDescription = description || defaultDescription; 
    const canonical = url ? `${baseUrl}${url}` : baseUrl;
    const image = ogImage || defaultImage;

    return ( 
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={canonical} />

            {/* facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Green Lotto Results Today - Live Updates" />
            <meta property="og:description" content="Check today's winning numbers and machine numbers. Fastest updates in Nigeria!" />
            <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" /> {/* Use a 1200x630px image with your logo */}
            <meta property="og:url" content="https://yourwebsite.com" />

            {/* 3. X (Twitter Cards) */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Green Lotto Results Today 🟢" />
            <meta name="twitter:description" content="Real-time Green Lotto draw results for 9AM, 1PM, 5PM, and 9PM." />
            <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" />
        </Helmet>
     );
}
 
export default SEO;