import React from 'react'
import { motion } from 'framer-motion'
import { Col, Container, Row } from 'react-bootstrap'

interface SectionProps {
  title: string
  content: string
  color: string
}

export const Section: React.FC<SectionProps> = ({ title, content, color }) => {
  return (
  <Container>
    <Row className="justify-content-center" style={{ height: '100vh', scrollSnapAlign: 'start', width: '100vw' }}>
      <Col xs={12} md={6} className="home-content" style={{ height: '100vh', width: '40vw', margin: '0%' }}></Col> 
      <Col xs={12} md={6} >
        <motion.div
          className="seccion"
          style={{
            backgroundColor: color,
            width: '40vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1}}
        >
          <h2>{title}</h2>
          <div>
            <p>{content}</p>
          </div>
        </motion.div>
      </Col>  
    </Row>
    </Container>
  )
}