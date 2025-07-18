import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-36 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        
        <div>
          <img loading="lazy" src="https://utfs.io/f/b7a585ae-8c49-4546-b582-176db4ec4d47-2f0x.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="https://utfs.io/f/3c2c4cd3-d862-4391-a7fc-3e64823356b8-vmrmy.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="https://utfs.io/f/9531202e-bc2e-4d09-94d2-aa28fb55dfba-1z16y.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="https://utfs.io/f/9c40519d-c595-4d0b-b8d6-e67b5f10495f-1t9xhz.jpg" alt="" />
          
        </div> 
        <div>
          <img loading="lazy" src="https://utfs.io/f/4ba8f60a-14ff-47c5-901e-328a2256037d-1sqbz.jpg" alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
