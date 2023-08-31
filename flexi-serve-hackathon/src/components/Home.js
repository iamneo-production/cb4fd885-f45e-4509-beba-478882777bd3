import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import {
  dataIntervals,
  localIntlMinsIntervals,
  validityIntervals,
  priceIntervals,
} from '../constants/SliderConstants'

const Home = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [recommendedPlans, setRecommendedPlans] = useState([])
  const [topTrendingPlans, setTopTrendingPlans] = useState([])
  const [modalData, setModalData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const [customData, setCustomData] = useState(5)
  const [customLocalMins, setCustomLocalMins] = useState(1000)
  const [customIntlMins, setCustomIntlMins] = useState(1000)
  const [customTexts, setCustomTexts] = useState(1000)
  const [customValidity, setCustomValidity] = useState(30)
  const [customPrice, setCustomPrice] = useState(10)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  useEffect(() => {
    loadPlans()
  }, [])

  useEffect(() => {
    console.log(customIntlMins)
    if (customData === 30 || customValidity === 90 || customIntlMins > 7000) {
      setCustomPrice(50)
    } else if (
      (customData >= 15 && customData <= 25) ||
      (customValidity >= 60 && customValidity <= 90)
    ) {
      setCustomPrice(40)
    } else if (
      customData >= 10 &&
      customData <= 15 &&
      customIntlMins === 9999
    ) {
      setCustomPrice(30)
    } else if (customIntlMins >= 3000 && customIntlMins <= 5000) {
      setCustomPrice(20)
    } else {
      setCustomPrice(10)
    }
  }, [customData, customLocalMins, customTexts, customIntlMins, customValidity])

  const loadPlans = () => {
    setIsLoading(true)
    setTimeout(() => {
      fetch('http://localhost:8080/plans')
        .then((res) => {
          if (!res.ok) {
            return {}
          }
          return res.json()
        })
        .then((res) => {
          setIsLoading(false)
          setRecommendedPlans(res?.recommended)
          setTopTrendingPlans(res?.topTrending)
        })
    }, 1000)
  }

  if (isLoading)
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    )

  const showMoreDetails = (data) => {
    setModalData(data)
  }
  const handleRecharge = (rechargeData) => {
    handleClose()
    sessionStorage.setItem('order', JSON.stringify(rechargeData))
    navigate('/recharge')
  }

  const handleCustomRecharge = () => {
    const customRechargeData = {
      header: 'Custom',
      date: '28/08/2023',
      price: customPrice,
      validity: customValidity,
      data: customData,
      localMins: customLocalMins,
      texts: customTexts,
      internationalMins: customIntlMins,
    }
    sessionStorage.setItem('order', JSON.stringify(customRechargeData))
    navigate('/recharge')
  }

  return (
    <div style={{ width: '96%', margin: 'auto' }}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{`Recommended (${recommendedPlans.length})`}</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                {recommendedPlans.map((plan) => (
                  <Col xs={6} md={4} key={plan.id}>
                    <Card border="dark" style={{ width: '18rem' }}>
                      <Card.Header>{plan.header}</Card.Header>
                      <Card.Body>
                        <Card.Title className="text-primary">
                          ${plan.price}
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
                            handleRecharge(plan)
                          }}
                        >
                          Recharge
                        </Button>
                        <Button
                          onClick={(e) => {
                            showMoreDetails(plan)
                            handleShow()
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
                  <Col key={plan.id}>
                    <Card border="dark" style={{ width: '18rem' }}>
                      <Card.Header>{plan.header}</Card.Header>
                      <Card.Body>
                        <Card.Title className="text-primary">
                          ${plan.price}
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
                            handleRecharge(plan)
                          }}
                        >
                          Recharge
                        </Button>
                        <Button
                          onClick={(e) => {
                            showMoreDetails(plan)
                            handleShow()
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
              <Row>
                <Col>Data:</Col>
                <Col>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={5}
                      value={customData}
                      onChange={(e) => setCustomData(e.target.value)}
                      step={5}
                      valueLabelDisplay="auto"
                      marks={dataIntervals}
                      min={5}
                      max={30}
                    />
                  </Box>
                </Col>
              </Row>
              <Row>
                <Col>Local Mins:</Col>
                <Col>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={1000}
                      value={customLocalMins}
                      onChange={(e) => setCustomLocalMins(e.target.value)}
                      step={1000}
                      valueLabelDisplay="auto"
                      marks={localIntlMinsIntervals}
                      min={1000}
                      max={9999}
                    />
                  </Box>
                </Col>
              </Row>
              <Row>
                <Col>International Mins:</Col>
                <Col>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={1000}
                      value={customIntlMins}
                      onChange={(e) => setCustomIntlMins(e.target.value)}
                      step={1000}
                      valueLabelDisplay="auto"
                      marks={localIntlMinsIntervals}
                      min={1000}
                      max={9999}
                    />
                  </Box>
                </Col>
              </Row>
              <Row>
                <Col>Texts:</Col>
                <Col>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={1000}
                      value={customTexts}
                      onChange={(e) => setCustomTexts(e.target.value)}
                      step={1000}
                      valueLabelDisplay="auto"
                      marks={localIntlMinsIntervals}
                      min={1000}
                      max={9999}
                    />
                  </Box>
                </Col>
              </Row>
              <Row>
                <Col>Validty:</Col>
                <Col>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={30}
                      value={customValidity}
                      onChange={(e) => setCustomValidity(e.target.value)}
                      step={30}
                      valueLabelDisplay="auto"
                      marks={validityIntervals}
                      min={30}
                      max={90}
                    />
                  </Box>
                </Col>
              </Row>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={10}
                      value={customPrice}
                      step={10}
                      valueLabelDisplay="auto"
                      marks={priceIntervals}
                      min={10}
                      max={50}
                    />
                  </Box>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleCustomRecharge()
                  }}
                  style={{ width: '10rem' }}
                >
                  Recharge
                </Button>
              </Row>
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
                  style={{ width: '28rem' }}
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
                      <strong>International Minutes:</strong>{' '}
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
              handleRecharge(modalData)
            }}
          >
            Recharge
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home
