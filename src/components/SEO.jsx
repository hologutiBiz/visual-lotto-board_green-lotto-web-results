import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, url, ogImage}) => {
    const siteName = 'Green Lotto Results';
    const siteOwner = 'by Visual Lotto Board';
    const baseUrl = 'https://green-lotto-result.visuallottoboard.com';
    const defaultDescription = "Check today's Green Lotto today results for all games. Real-time winning and machine number for Naija Vag, Dream Number, Odogwu, UNLIMITED, Wazobia, Destiny, Faaji, Champion.";
    const defaultImage = 'https://res.cloudinary.com/ddatfadov/image/upload/v1772397339/Green-lotto_banner_wr8vrz.png';

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
            <meta property="og:image" content="https://res.cloudinary.com/ddatfadov/image/upload/v1772397339/Green-lotto_banner_wr8vrz.png" /> {/* Use a 1200x630px image with your logo */}
            <meta property="og:url" content="https://green-lotto-result.visuallottoboard.com" />

            {/* 3. X (Twitter Cards) */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@visuaLottoBoard" />
            <meta name="twitter:title" content="Green Lotto Results | by Visual Lotto Board" />
            <meta name="twitter:description" content="Check today's Green results for all games. Real-time winning and machine number for Naija Vag, Dream Number, Odogwu, UNLIMITED, Wazobia, Destiny, Faaji." />
            <meta name="twitter:image" content="https://res.cloudinary.com/ddatfadov/image/upload/v1772397339/Green-lotto_banner_wr8vrz.png" />
            <meta name="twitter:url" content="https://green-lotto-result.visuallottoboard.com" />
        </Helmet>
     );
}
 
export default SEO;