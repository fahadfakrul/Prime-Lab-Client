import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import Banner from "../Banner/Banner";
import FeaturedTests from "../FeaturedTests/FeaturedTests";
import Promotions from "../Promotions/Promotions";
import Recommendations from "../Recommendations/Recommendations";


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <SectionTitle heading={"Featured Tests"} subheading={"Explore the Top Tests Trusted by Our Customers"}></SectionTitle>
            <FeaturedTests></FeaturedTests>
            <SectionTitle heading={"Promotions"} subheading={"Take advantage of our exclusive discounts and special offers on various health tests and packages."}></SectionTitle>
            <Promotions></Promotions>
            <SectionTitle heading={"Expert Recommendations"} subheading={"Stay ahead with our curated health tips, preventive measures, and upcoming test recommendations tailored just for you."}></SectionTitle>
            <Recommendations></Recommendations>
        </div>
    );
};

export default Home;