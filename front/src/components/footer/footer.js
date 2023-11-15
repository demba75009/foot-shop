import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Footer  ()  {
  return (
    <footer style={{backgroundColor:"#282C31"}} className="mt-5 footercss text-dark ">
      <Container fluid >
        <Row  style={{color:"#B8C7CF"}} className='mt-5 text-center '>
          <Col sm={12} md={4}>
            <h4>Foot-Shop</h4>
            <p>Crée par KANTE Demba</p>
          </Col>
          <Col sm={12} md={4}>
            <h4>Quelques informations:</h4>
            <NavLink className="navlink">A Propos</NavLink>
          </Col>
          <Col  sm={12} md={4}>
            <h4>Contact Information</h4>
          linkedin :  <a href="https://www.linkedin.com/in/demba-kante-68510714b/details/featured/">

              <img width={20} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAYFBMVEUCdLP///8AbrCOstOErM8AcbFDir5MjL9Fjb87hLvy9/pqnsn7/v9HhrwAa68AZKwAaK6Vt9Z6qM63zuPY5vCrxt7g7PRZksImerbC1+iavdnN3+wAYKpPksKiwdvo8ff8oTdgAAADEElEQVRoge3b2ZqjIBAGUETJogY17rE17/+WrXHMJPBr54LCWaiLvtHPEwWlChrmPaLKM99eZHk1s2z6U5y45HajLxZ94JzZDs6HWR9S6/YU6TDpndwFZ0x2o34WO+ni7LHCfpsvwQtW7vXgx0dfMn/He/dZsKMeON3pTl9CcCkl6Vd4VReyqf1h8OuG8Aes6bwp73P2cS8bsqZZ0dMo9J4RXxOrepp5b5ERpR9Q55GnREAzDiJdNLGqxweSrod0mau457Ukzx7o4hzqenihuHmg663+aHmK1w7ockB6TvHogZ62SO8o3vmP9cKWDro8UadHvS5AekbxvUFv3AXgcW3pjWO8A81OMs5Bvdb1yJo+FjgqntsbZRhLlGdPVWOvZBfvA01LVWeuZVbyWi12dbWdWY0HRFQW97AYIkFXYW9k1CJNxiBNqf/casLpf5kupnlQybn4ub9iXWixefTlkExYHWS3280PonOa8O1fgPWzFptHm+Visr5Vv2uBOOz8o9x6srCaOMShGsfnTYiTejSeP4aCR4VehhSRWPexro+wr7p28KHLA0gLHkNUv/qxNKZ/wXxsjmwtIzWlJzARXqJd4Q3pfBNfzU7M6Aksf17Dh7wZHVZ+b4FLcDP6/UcdJ2dG9I8iAjdvT0dlqD0dLf9Y1DP9i2tRBzW4Rd3Te71RPa66tm31ge5X9FrDG9Tv2WUc4VPJzj5+//WGN6eXbEn9hWzgYJvT6f7rzIpIKnBKR6a3X++X0Cdbx6ahavewUa6RalMAY6dUcVN6qc5oCTD/4TXqzZvR0ZwS6Pfat9aMrrconHM80ehgKlHe9NO0z40ZHUwl8qt+mjbxZUYH82kCZFtEOuh0oremH4F+tKaDZRN7eux0pzvd6U53utOd7nSnO93pTv+P9c0ambqGZex0UOPzo8/Qzjqok3pm1qDxQvMHp/1zq/9Od7rTt3SwRmhNz3beI1bteO8V84578fzoMaL/lf1EL6Y9odqKkp2YVs2m/bDlLvthpyW7eS9wL+zuBZaifyyWsjnr2Wkf9DfLjENHVal1eAAAAABJRU5ErkJggg==" alt="" srcset="" />


            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
