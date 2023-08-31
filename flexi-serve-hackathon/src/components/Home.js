import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlans, setRecommendedPlans] = useState([]);
  const [topTrendingPlans, setTopTrendingPlans] = useState([]);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:8080/plans")
        .then((res) => {
          if (!res.ok) {
            return {};
          }
          return res.json();
        })
        .then((res) => {
          setIsLoading(false);
          setRecommendedPlans(res?.recommended);
          setTopTrendingPlans(res?.topTrending);
        });
    }, 1000);
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

  const showMoreDetails = (data) => {
    setModalData(data);
  };
  const handleRecharge = (rechargeData) => {
    handleClose();
    navigate("/recharge");
  };

  return (
    <div style={{ width: "96%", margin: "auto" }}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{`Recommended (${recommendedPlans.length})`}</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                {recommendedPlans.map((plan) => (
                  <Col xs={6} md={4}>
                    <Card
                      border="dark"
                      style={{ width: "18rem" }}
                      key={plan.id}
                    >
                      <Card.Header>{plan.header}</Card.Header>
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
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            handleRecharge(plan);
                          }}
                        >
                          Recharge
                        </Button>
                        <Button
                          onClick={(e) => {
                            showMoreDetails(plan);
                            handleShow();
                          }}
                          variant="link"
                        >
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
                      <Card.Header>{plan.header}</Card.Header>
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
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            handleRecharge(plan);
                          }}
                        >
                          Recharge
                        </Button>
                        <Button
                          onClick={(e) => {
                            showMoreDetails(plan);
                            handleShow();
                          }}
                          variant="link"
                        >
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
        <Accordion.Item eventKey="3">
          <Accordion.Header>Make your own plan</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row></Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Card
                  border="dark"
                  style={{ width: "28rem" }}
                  key={modalData.id}
                >
                  <Card.Header>{modalData.header}</Card.Header>
                  <Card.Body>
                    <Card.Title className="text-primary">
                      {modalData.price}
                    </Card.Title>
                    <Card.Text>
                      <strong>Validty:</strong> {modalData.validity}
                    </Card.Text>
                    <Card.Text>
                      <strong>Data:</strong> {modalData.data}
                    </Card.Text>
                    <Card.Text>
                      <strong>Texts:</strong> {modalData.texts}
                    </Card.Text>
                    <Card.Text>
                      <strong>Local Minutes:</strong> {modalData.localMins}
                    </Card.Text>
                    <Card.Text>
                      <strong>International Minutes:</strong>{" "}
                      {modalData.internationalMins}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleRecharge(modalData);
            }}
          >
            Recharge
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
