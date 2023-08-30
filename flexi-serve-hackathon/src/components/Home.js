import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const usenavigate = useNavigate();
  
  useEffect(() => {
  }, []);

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Recommended (3)</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                <Col>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>$15</Card.Title>
                      <Card.Text>Validty: 28 days</Card.Text>
                      <Card.Text>Data: 1.5 GB/day</Card.Text>
                      <Button variant="primary">Recharge</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>$15</Card.Title>
                      <Card.Text>Validty: 28 days</Card.Text>
                      <Card.Text>Data: 1.5 GB/day</Card.Text>
                      <Button variant="primary">Recharge</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>$15</Card.Title>
                      <Card.Text>Validty: 28 days</Card.Text>
                      <Card.Text>Data: 1.5 GB/day</Card.Text>
                      <Button variant="primary">Recharge</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Top Trending Plans (3)</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                <Col>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>$15</Card.Title>
                      <Card.Text>Validty: 28 days</Card.Text>
                      <Card.Text>Data: 1.5 GB/day</Card.Text>
                      <Button variant="primary">Recharge</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>$15</Card.Title>
                      <Card.Text>Validty: 28 days</Card.Text>
                      <Card.Text>Data: 1.5 GB/day</Card.Text>
                      <Button variant="primary">Recharge</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>$15</Card.Title>
                      <Card.Text>Validty: 28 days</Card.Text>
                      <Card.Text>Data: 1.5 GB/day</Card.Text>
                      <Button variant="primary">Recharge</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Home;
