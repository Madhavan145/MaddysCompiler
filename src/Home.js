// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import image1 from './coding.jpg';


const Container = styled.div`
  text-align: center;
  margin-top: 0%;
  max-width: 100%;
`;

const Img = styled.img`
  width: 50vw;
  height: auto;
  max-width: 100%; /* Adjust as needed */
`;

const NavBar = styled.nav`
  background-color: #333;
  padding: 15px;
`;

const NavItem = styled(Link)`
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-weight: bold;
`;

const Heading = styled.h1`
  font-size: 3em;
  color:antiquewhite;
`;

const VectorArts = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  max-width: 100%;
`;


const Home = () => (
  <Container>
    <NavBar>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/compiler">Compiler</NavItem>
      <NavItem to="/about">About</NavItem>
    </NavBar>
    <Heading>Maddy's Code Compiler</Heading>
    <VectorArts>
      {/* Include your vector arts or illustrations here */}
      <Img src={image1} alt="Vector Art 1" />     
    </VectorArts>
    <p>Scroll down for the compiler</p>
  </Container>
);

export default Home;
