import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedinIcon from "@material-ui/icons/Linkedin";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="/profileImg.jpg"
              alt="Founder"
            />
            <Typography>Syed Abdullah</Typography>
            <a
              href="https://www.instagram.com/abdullahsyed_56/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button color="primary">Visit Instagram</Button>
            </a>
            <span>
              This e-commerce platform is developed by Syed Abdullah as a
              demonstration of advanced MERN Stack proficiency. Built with a
              scalable architecture and modern design principles, it showcases
              core functionalities of a full-fledged e-commerce system. This
              project serves as the foundation for a future startup, where
              additional features like AI-powered recommendations, real-time
              inventory tracking, and seamless payment integrations will be
              introduced. Stay tuned — this is just the beginning.
            </span>
          </div>

          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/syed-muhammad-abdullah-mahmood-0a88a8266/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="linkedinSvgIcon" />
            </a>

            <a
              href="https://www.instagram.com/abdullahsyed_56/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
