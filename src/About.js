// About.js

import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mongoDB from './mongodb.jpg';
import reactJs from './reactjs.jpg';
import nodeJS from './nodejs.png';
import expressJS from './ExpressJS.png';
import './About.css'; // Create this CSS file for styling

const About = () => {
  const carouselItems = [
    { id: 1, src: mongoDB, alt: 'MongoDB' },
    { id: 2, src: expressJS, alt: 'ExpressJs' },
    { id: 3, src: reactJs, alt: 'ReactJs' },
    { id: 4, src: nodeJS, alt: 'NodeJS' },
  ];

  const duplicatedItems = [...carouselItems, ...carouselItems]; // Duplicate items for circular effect

  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className='Madhavan-h2'>About me</h2>
        <p>
          Hello, this is Madhavan, pursuing M.Tech in Software Engineering at the Vellore Institute of Technology, Tamil Nadu.<br />
          I am a passionate developer who loves to work on various domains such as a full-stack developer with experience in MERN Stack development,<br />
          also an Artificial Intelligence and Machine Learning Enthusiast.
        </p>
      </div>

      <div className="image-carousel">
        <Carousel interval={500} 
                  indicators={false}
                  controls={false}
        >
          {duplicatedItems.map(item => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.src}
                alt={item.alt}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="technologies">
        <h2 className='h2'>Technologies Used</h2>
        <p>This Code compiler is built not only with the following technologies but also with passion.</p>
        <ul>
          <li>MongoDB</li>
          <li>Express.js</li>
          <li>React.js</li>
          <li>Node.js</li>
          <li>Redis / Bull</li>
        </ul>
      </div>
      <div className="footer">
        <p>&copy; 2023 @Maddy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
