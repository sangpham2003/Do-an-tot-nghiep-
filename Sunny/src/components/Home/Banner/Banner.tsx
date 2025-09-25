import React from "react";
import Slider from "./Slider";
import Img1 from "../../../assets/img/home-banner/other/img1.jpeg";
import Img2 from "../../../assets/img/home-banner/other/img2.jpeg";
import { Link } from "react-router-dom";
import { IBannerRightDataTypes } from "../../../types/types";

const Banner: React.FC = () => {
  const BannerRightData: IBannerRightDataTypes[] = [
    { id: 1, img: "https://lh3.googleusercontent.com/k68rqo1M0CFkVs0xOQj-zzuBMFNc1dFDOhoXFzIUd39Cga2j2hNi_TtqKw7zjSXurq_ctq4caIeQfurw1GUe03KxxjNMiZ-9rw=w1920-rw" },
    {
      id: 2,
      img: "https://lh3.googleusercontent.com/fQe5S9rfCCTrBikICp0IiPRNOIq0GCp1omYLCS08haKO0tSE3rEioKhFnTgvcPIFqUMfdPpewATi_zEL1INFJU7IEa-wM0iM=w1920-rw",
    },
  ];

  return (
    <section id="home-banner">
      <div className="container">
        <div className="home-banner-content">
          <div className="banner-slider-wrapper banner-left">
            <Slider />
          </div>
          <div className="banner-right-imgs">
            {BannerRightData.map((item) => (
              <div key={item.id} className="banner-img-wrapper">
                <Link to="/shop">
                  <img
                    src={item.img}
                    alt="banner-img"
                    style={{
                      width: "390px",
                      height: "193px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
