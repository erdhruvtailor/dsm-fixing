import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaUsers, FaBusinessTime, FaBook, FaLink } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';
import ComingsoonPage from "../pages/ComingsoonPage";

const Header = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
      <Navbar
          bg='danger'
          variant='dark'
          expand='md'
          collapseOnSelect
          className='fixed-top z-2'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <abbr title="Darji Community Common Platform">
                <img src="/blacklogo.png" alt="" width="20%" /> DCCP
              </abbr>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto m-2'>
              <LinkContainer to='/aboutUs'>
                <Nav.Link>
                  <FaUsers style={{ marginRight: '5px' }} />
                  About Us
                </Nav.Link>
              </LinkContainer>

              {userInfo && (
                  <NavDropdown title="Explore" id='explore-dropdown'>
                    <LinkContainer to='/matrimonialHomePage'>
                      <NavDropdown.Item>
                        <FaUser style={{ marginRight: '5px' }} />
                        Matrimonial Panel
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/ComingsoonPage'>
                      <NavDropdown.Item>
                        <FaBusinessTime style={{ marginRight: '5px' }} />
                        Business Panel
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/ComingsoonPage'>
                      <NavDropdown.Item>
                        <FaBook style={{ marginRight: '5px' }} />
                        Blog Panel
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/ComingsoonPage'>
                      <NavDropdown.Item>
                        <FaLink style={{ marginRight: '5px' }} />
                        Connections Panel
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
              )}

              {userInfo && (
                  <NavDropdown title={`Hello👋, ${userInfo.name}`} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                {/*    <NavDropdown.Divider />
                    <LinkContainer to='/matrimonialHomePage'>
                      <NavDropdown.Item>
                        <FaUser style={{ marginRight: '5px' }} />
                        Matrimonial Panel
                      </NavDropdown.Item>
                    </LinkContainer>*/}
                  </NavDropdown>
              )}

              {!userInfo && (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser style={{ marginRight: '5px' }} />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default Header;
