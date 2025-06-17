import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <h1>Get in Touch</h1>
      <p>If you have any questions or want to collaborate, feel free to reach out:</p>

      <a
        className="mailBtn"
        href="mailto:syedabdullah8750@gmail.com?subject=Let%27s%20Connect&body=Hi%20Abdullah%2C%20I%20came%20across%20your%20website%20and%20wanted%20to%20get%20in%20touch%20with%20you."
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="contained" color="primary">
          Email Me
        </Button>
      </a>
    </div>
  );
};

export default Contact;
