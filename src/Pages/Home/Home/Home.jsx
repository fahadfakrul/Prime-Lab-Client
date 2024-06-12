import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import Banner from "../Banner/Banner";
import FeaturedTests from "../FeaturedTests/FeaturedTests";
import Promotions from "../Promotions/Promotions";


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <SectionTitle heading={"Featured Tests"} subheading={"Explore the Top Tests Trusted by Our Customers"}></SectionTitle>
            <FeaturedTests></FeaturedTests>
            <SectionTitle heading={"Promos"} subheading={"Take advantage of our exclusive discounts and special offers on various health tests and packages."}></SectionTitle>
            <Promotions></Promotions>
        </div>
    );
};

export default Home;