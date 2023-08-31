import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const AppHeader = () => {
  const [displayUsername, displayUsernameUpdate] = useState('')
  const [showMenu, showMenuUpdate] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      showMenuUpdate(false)
    } else {
      showMenuUpdate(true)
      let username = sessionStorage.getItem('username')
      if (username === '' || username === null) {
        navigate('/login')
      } else {
        displayUsernameUpdate(username)
      }
    }
  }, [location])
  return (
    <div>
      {showMenu && (
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Virtual DOMinators</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/order-history">Orders</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="d-flex">
                Signed in as:{' '}
                <Nav.Link
                  href="/profile"
                  style={{ padding: 0, marginLeft: '5px' }}
                >
                  {displayUsername}
                </Nav.Link>
              </Navbar.Text>
              <Nav.Link href="/login" className="justify-content-end">
                Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
    </div>
  )
}

export default AppHeader
