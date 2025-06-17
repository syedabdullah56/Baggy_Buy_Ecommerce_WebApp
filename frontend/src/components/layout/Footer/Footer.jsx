import React from 'react'
import playStore from "../../../../ecommerce images/playstore.webp"
import appStore from "../../../../ecommerce images/appStore.png"
import "./Footer.css"
const footer = () => {
  return (
      <footer id='footer'>

          <div className="leftFooter">
            <h4>Download Our App</h4>
            <p>Download App For Android And IOS Mobile Phones</p>
            <img src={playStore} id='playstore' alt="playstore" />
            <img src={appStore} id='appstore' alt="appstore" />
          </div>


          <div className="midFooter">
              <h1>BaggyBuy.</h1>
              <p>High Quality Is Our First Priority</p>
              <p>Copyrights 2025 &copy; MeSyedAbdullah</p>
          </div>

          <div className="rightFooter">
              <h4>Follow Us</h4>
              <a href="https://www.facebook.com/syedsohaib.anwer">Facebook</a>
              <a href="https://www.linkedin.com/in/syed-muhammad-abdullah-mahmood-0a88a8266/">Linkedin</a>
            
          </div>

      </footer>

  )
}

export default footer;
