import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const usenavigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlans, setRecommendedPlans] = useState([]);
  const [topTrendingPlans, setTopTrendingPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:8080/plans")
        .then((res) => {
          if (!res.ok) {
            return false;
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setRecommendedPlans(res?.recommended);
          setTopTrendingPlans(res?.topTrending);
        });
    }, 3000);
  };
  if (isLoading)
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{`Recommended (${recommendedPlans.length})`}</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                {recommendedPlans.map((plan) => (
                  <Col>
                    <Card
                      border="dark"
                      style={{ width: "18rem" }}
                      key={plan.id}
                    >
                      <Card.Header>Featured</Card.Header>
                      <Card.Body>
                        <Card.Title className="text-primary">
                          {plan.price}
                        </Card.Title>
                        <Card.Text>
                          <strong>Validty:</strong> {plan.validity}
                        </Card.Text>
                        <Card.Text>
                          <strong>Data:</strong> {plan.data}
                        </Card.Text>
                        <Button variant="primary">Recharge</Button>
                        <Button onClick={console.log("clicked")} variant="link">
                          More details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>{`Top Trending Plans (${topTrendingPlans.length})`}</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                {topTrendingPlans.map((plan) => (
                  <Col>
                    <Card
                      border="dark"
                      style={{ width: "18rem" }}
                      key={plan.id}
                    >
                      <Card.Header>Featured</Card.Header>
                      <Card.Body>
                        <Card.Title className="text-primary">
                          {plan.price}
                        </Card.Title>
                        <Card.Text>
                          <strong>Validty:</strong> {plan.validity}
                        </Card.Text>
                        <Card.Text>
                          <strong>Data:</strong> {plan.data}
                        </Card.Text>
                        <Button variant="primary">Recharge</Button>
                        <Button onClick={console.log("clicked")} variant="link">
                          More details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Home;
