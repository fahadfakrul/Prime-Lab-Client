import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/pagination";
import "./Recommendation.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Recommendations = () => {
      const axiosPublic =useAxiosPublic()
    const {data: recommendations = [] } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
           const res = await axiosPublic.get("/recommendations")
           return res.data;
        }
    })

  return (
    <div className="mb-20">
      <Swiper
        effect={"coverflow"}
        loop={true}
        autoplay={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {
            recommendations.map(recommend =>  <SwiperSlide
            key={recommend._id}
                style={{
                  backgroundImage:
                    `url(${recommend.image})`,
                  borderRadius: "16px",
                }}
              >
                <div className="content">
                  <h3 className="text-4xl uppercase font-niramit font-semibold mb-3">
                    {recommend.title}
                  </h3>
                  <p>
                    {recommend.description}
                  </p>
                </div>
              </SwiperSlide>)
        }
       
        
      </Swiper>
    </div>
  );
};

export default Recommendations;
