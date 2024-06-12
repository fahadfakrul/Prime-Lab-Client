import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import Banner from "../Banner/Banner";
import FeaturedTests from "../FeaturedTests/FeaturedTests";


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <SectionTitle heading={"Featured Tests"} subheading={"Explore the Top Tests Trusted by Our Customers"}></SectionTitle>
            <FeaturedTests></FeaturedTests>
        </div>
    );
};

export default Home;