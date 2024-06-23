import React, { useEffect, useState } from 'react';

import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  Form,
  ListGroupItem
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import {LinkContainer} from "react-router-bootstrap";
import {useGetMatrimonialProfileDetailsQuery} from "../slices/matrimonialProfilesApiSlice";

const MatrimonialProfilePage = () =>
{
  const { id: matrimonialProfileId } = useParams();
  const { userInfo } = useSelector(state => state.auth);

  const {
    data: matrimonialProfile,
    isLoading,
    error
  } = useGetMatrimonialProfileDetailsQuery(userInfo.matrimonialProfileId);

  console.log(matrimonialProfile);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <Meta title={'Matrimonial Profile'} />
          <h1>Matrimonial Profile</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer to={'/matrimonialProfile/create'}>
            <Button className=' my-3' variant='warning'>Add Matrimonial Profile</Button>
          </LinkContainer>
        </Col>
      </Row>


      <Meta title={matrimonialProfile.fullName} description={matrimonialProfile.fullName} />

      <Row>
        <Col md={5}>
          <Image src={matrimonialProfile.image} alt={matrimonialProfile.fullName} fluid />
        </Col>
        <Col md={4}>

          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{matrimonialProfile.fullName}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong> Gender:</strong>
              {matrimonialProfile.gender}
            </ListGroup.Item>
          </ListGroup>

        </Col>
      </Row>
    </>
  );
};

export default MatrimonialProfilePage;
