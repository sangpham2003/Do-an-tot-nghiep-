import React from "react";
import { Link } from "react-router-dom";
import { SocialMediaData } from "../../Other/SocialMediaData";

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us">
      {/* ======= Title ======= */}
      <div className="contact-us-title">
        <h6>Liên hệ với chúng tôi</h6>
      </div>
      <div className="contact-us-content">
        {/* ======= Content - text ======= */}
        <div className="text">
          <p>Gọi cho chúng tôi 24/7</p>
          <h3>0386 375 697</h3>
          <p>
            224 Đường Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội.
            <br />
            <Link to="#/">sunny@gmail.com</Link>
          </p>
        </div>
        {/* ======= Content - social media ======= */}
        <div className="social-media">
          <ul>
            {SocialMediaData.map((item) => (
              <li key={item.id}>
                <Link to={item.href} className={item.class}>
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
