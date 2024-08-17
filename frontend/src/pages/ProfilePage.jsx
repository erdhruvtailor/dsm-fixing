import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Meta from '../components/Meta';
import ProfileForm from '../components/ProfileForm';


const ProfilePage = () => {
  return (
    <>
      <Row>
        <Col md={4}>
          <Meta title={'User Profile'} />
          <h2>My Profile</h2>
          <ProfileForm />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
