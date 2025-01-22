import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const Home: React.FC = () => {
  return (
    <section className="home" >
      <Container >
        <Row className="justify-content-center">
          <Col xs={12} md={6} >
            <h1>Bienvenido a mi proyecto 3d</h1>
            <p className="subtitle">Explorá la página</p>
            <div className="scroll-indicator">
              <p>Scroll para ver</p>
              <div className="arrow-down"></div>
            </div>
          </Col>
          <Col xs={12} md={6} className="home-content" ></Col>
        </Row>
      </Container>
    </section>
  )
}