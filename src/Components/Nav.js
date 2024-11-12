import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button'; // นำเข้า Button เพื่อใช้สำหรับปุ่มออกจากระบบ
import { useNavigate } from 'react-router-dom';

function Navbar_01() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <>
      <Navbar className='shadow' bg="dark" data-bs-theme="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>หน้าหลัก</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/statistics">
              <Nav.Link>สถิติ</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/history">
              <Nav.Link>ประวัติ</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>เข้าสู่ระบบ</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>ลงทะเบียน</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <Button variant="outline-light" onClick={handleLogout}>
                ออกจากระบบ
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar_01;
