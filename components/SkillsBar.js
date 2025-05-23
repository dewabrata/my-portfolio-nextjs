import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './SkillsBar.module.css'; // Menggunakan CSS Modules

function SkillsBar() {
  const skills = [
    "Mobile Application Design",
    "Website Design & Logo",
    "UI/UX Mobile Design",
    "Website Design & Logo",
    "Business Branding",
    "Mobile Application Design"
  ];

  return (
    <section className={`${styles['skills-bar']} py-3`}>
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-around align-items-center flex-wrap">
            {skills.map((skill, index) => (
              <span key={index} className={`${styles['skill-item']} text-uppercase mx-3 my-2`}>
                {skill} <span className="text-success">*</span>
              </span>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SkillsBar;
