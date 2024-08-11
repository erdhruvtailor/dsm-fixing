import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Meta from '../components/Meta';
import "../assets/styles/AboutUs.css"; // Custom CSS file for styling

const AboutUs = () => {
  return (
      <>
        <Meta title="About Us - DCCP" />
            <>
              <div className="about-us-container">
                <h2 className="about-us-title">Darji Community Common Platform (DCCP)</h2>
                <Row className="about-us-content">
                  <Col md={7} className="about-us-text">
                    <h4>
                      The noble objective of this web application is to serve the Darji community by providing a common platform for businesses, connections, events, donations, and matrimonial services.
                    </h4>
                    <h4>
                      વેબ એપ્લિકેશનનો ઉમદા ઉદ્દેશ્ય વ્યવસાયો, જોડાણો, ઇવેન્ટ્સ, દાન અને લગ્ન માટે દરજી સમુદાય પ્લેટફોર્મ પ્રદાન કરીને દરજી સમુદાયની સેવા કરવાનો છે.
                    </h4>
                    <img src="aboutus32.jpg" alt="Community Event" className="about-us-image-large" />
                  </Col>
                  <Col md={5} className="about-us-image-col">
                    <img src="aboutus2.png" alt="Platform Overview" className="about-us-image-full" />
                  </Col>
                </Row>
                <div className="about-us-center-image">
                  <img src="aboutus4.jpg" alt="Community Logo" className="about-us-logo" />
                </div>
              </div>
            </>
      </>
  );
};

export default AboutUs;
