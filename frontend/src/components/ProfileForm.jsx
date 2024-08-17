import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Col, Row, Card, Container } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation, useGetUserProfileQuery } from '../slices/usersApiSlice';
import { FaEye, FaEyeSlash, FaUserEdit } from 'react-icons/fa';
import Loader from './Loader';

const ProfileForm = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [gender, setGender] = useState(userInfo?.gender || '');
  const [dob, setDob] = useState(userInfo?.dob || ''); // Ensure this is in YYYY-MM-DD format
  const [mobile, setMobile] = useState(userInfo?.mobile || '');
  const [address, setAddress] = useState(userInfo?.address || '');
  const [city, setCity] = useState(userInfo?.city || '');
  const [country, setCountry] = useState(userInfo?.country || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [updateProfile, { isLoading: isUpdateProfileLoading }] = useProfileMutation();
  const dispatch = useDispatch();
  const { data, refetch } = useGetUserProfileQuery();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setGender(data.gender);
      setDob(data.dob || ''); // Ensure this is in YYYY-MM-DD format
      setMobile(data.mobile);
      setAddress(data.address);
      setCity(data.city);
      setCountry(data.country);
    }
  }, [data]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match!');
    }

    try {
      const res = await updateProfile({
        name,
        email,
        gender,
        dob, // Ensure this is in YYYY-MM-DD format
        mobile,
        address,
        city,
        country,
        password
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      await refetch(); // This should update the data
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (!editMode) {
    return (
        <Container className="profile-container">
          <Card className="profile-card">
            <Row className="mb-3">
              <Col>
                <h4 className="profile-title">Profile Details</h4>
                <div className="profile-detail">
                  <strong>Name:</strong> {name}
                </div>
                <div className="profile-detail">
                  <strong>Email:</strong> {email}
                </div>
                <div className="profile-detail">
                  <strong>Gender:</strong> {gender}
                </div>
                <div className="profile-detail">
                  <strong>Date of Birth:</strong> {dob ? new Date(dob).toLocaleDateString() : 'N/A'}
                </div>
                <div className="profile-detail">
                  <strong>Mobile:</strong> {mobile}
                </div>
                <div className="profile-detail">
                  <strong>Address:</strong> {address}
                </div>
                <div className="profile-detail">
                  <strong>City:</strong> {city}
                </div>
                <div className="profile-detail">
                  <strong>Country:</strong> {country}
                </div>
              </Col>
            </Row>
            <Button className="edit-profile-button" onClick={() => setEditMode(true)}>
              <FaUserEdit className="me-2" /> Edit Profile
            </Button>
          </Card>
        </Container>
    );
  }

  return (
      <Container className="profile-container">
        <Form onSubmit={submitHandler}>
          <Card className="profile-card">
            <h4 className="profile-title">Edit Profile</h4>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                      value={name}
                      type="text"
                      placeholder="Enter name"
                      onChange={e => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      value={email}
                      type="email"
                      placeholder="Enter email"
                      onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                        type="radio"
                        id="gender-male"
                        label="Male"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={e => setGender(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        id="gender-female"
                        label="Female"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={e => setGender(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                      value={dob}
                      type="date"
                      placeholder="Enter DOB"
                      onChange={e => setDob(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                      value={mobile}
                      type="text"
                      placeholder="Enter mobile number"
                      onChange={e => setMobile(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                      value={address}
                      type="text"
                      placeholder="Enter address"
                      onChange={e => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                      value={city}
                      type="text"
                      placeholder="Enter city"
                      onChange={e => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                      value={country}
                      type="text"
                      placeholder="Enter country"
                      onChange={e => setCountry(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
                variant="link"
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="mb-3 change-password-link"
            >
              {showChangePassword ? 'Hide Change Password' : 'Change Password'}
            </Button>

            {showChangePassword && (
                <>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          placeholder="Enter password"
                          onChange={e => setPassword(e.target.value)}
                      />
                      <InputGroup.Text
                          onClick={togglePasswordVisibility}
                          style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          placeholder="Confirm password"
                          onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <InputGroup.Text
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ cursor: 'pointer' }}
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </>
            )}

            <Button className="mb-3 w-100 update-profile-button" variant="success" type="submit">
              Update Profile
            </Button>

            {isUpdateProfileLoading && <Loader />}
          </Card>
        </Form>
      </Container>
  );
};

export default ProfileForm;
