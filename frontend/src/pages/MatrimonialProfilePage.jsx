import React, {useEffect, useState} from 'react';

import {
    Row,
    Col,
    ListGroup,
    Button,
    Image,
    Card,
    Form,
    ListGroupItem, Table
} from 'react-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Meta from '../components/Meta';
import {LinkContainer} from "react-router-bootstrap";
import {
    useGetMatrimonialProfileDetailsQuery,
    useGetMatrimonialProfileQuery
} from "../slices/matrimonialProfilesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {FaEdit, FaRegEye, FaStreetView, FaTrash} from "react-icons/fa";
import Rating from "../components/Rating";
import {addCurrency} from "../utils/addCurrency";

const MatrimonialProfilePage = () => {
    const {id: matrimonialProfileId} = useParams();
    const {userInfo} = useSelector(state => state.auth);

    const {
        data: matrimonialProfile,
        isLoading,
        error
    } = useGetMatrimonialProfileDetailsQuery(matrimonialProfileId);

    const {
        data: matrimonialProfileAllEntries,
        isLoading2,
        error2
    } = useGetMatrimonialProfileQuery();

    return (
        <>

            <Row className='align-items-center'>
                <Col>
                    <Meta title={'Matrimonial Profile'}/>
                    <h3>Matrimonial Profile</h3>
                </Col>
                <Col className='text-end'>
                    <LinkContainer to={'/matrimonialProfile/create'}>
                        <Button className=' my-3' variant='warning'>Add Matrimonial Profile</Button>
                    </LinkContainer>
                </Col>
            </Row>


            {isLoading ? (
                <Loader/>
            ) : matrimonialProfileId ? "" : (

            <Row>
                {matrimonialProfileAllEntries?.map(matrimonialProfileAllEntry => (
                    <Col key={matrimonialProfileAllEntry._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className='my-3 p-3 rounded text-center'>
                            <Link
                                to={`/matrimonialProfile/${matrimonialProfileAllEntry._id}`}
                                style={{textDecoration: 'none'}}
                                className='text-dark'
                            >
                                <Card.Img
                                    variant='top'
                                    src={matrimonialProfileAllEntry.image}
                                    style={{height: '200px', objectFit: 'contain'}}
                                />
                                <Card.Body>
                                    <Card.Title as='div' className='product-title'>
                                        <h2><strong>{matrimonialProfileAllEntry.fullName}</strong></h2>
                                    </Card.Title>

                                    <Card.Text
                                        as='p'>{matrimonialProfileAllEntry.currentAddressOfCandidate}</Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
            )}


            {/*<Table striped hover bordered responsive size='sm'>
                <thead>
                <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {matrimonialProfileAllEntries?.map(matrimonialProfileAllEntry => (
                    <tr key={matrimonialProfileAllEntry._id}>
                        <td>{matrimonialProfileAllEntry.fullName}</td>
                        <td>{matrimonialProfileAllEntry.email}</td>
                        <td>
                            <LinkContainer to={`/matrimonialProfile/${matrimonialProfileAllEntry._id}`}>
                                <Button className='btn-sm' variant='light'>
                                    <FaRegEye style={{color: 'blue'}}/>
                                </Button>
                            </LinkContainer>
                            <LinkContainer to={`/matrimonialProfile/update/${matrimonialProfileAllEntry._id}`}>
                                <Button className='btn-sm' variant='light'>
                                    <FaEdit style={{color: 'grey'}}/>
                                </Button>
                            </LinkContainer>
                            <Button className='btn-sm' variant='light' onClick={() => {
                            }}>
                                <FaTrash style={{color: 'red'}}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>*/}


            {isLoading ? (
                <Loader/>
            ) : error ? "" : (
                <>

                    <Meta title={matrimonialProfile.fullName} description={matrimonialProfile.fullName}/>

                    <Row>
                        <Col md={4}>
                            <Image src={matrimonialProfile.image} alt={matrimonialProfile.fullName} fluid/>
                        </Col>
                        <Col md={5}>

                            <ListGroup variant='flush'>

                                <ListGroup.Item>
                                    <h3>{matrimonialProfile.fullName}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <p> Gender: {matrimonialProfile.gender}</p>
                                    <p>Birth Date: {matrimonialProfile.birthDate}</p>
                                    <p>Birth Time : {matrimonialProfile.birthTime}
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Birth Place
                                        : {matrimonialProfile.birthPlace}</p>

                                    <p>Height : {matrimonialProfile.height}
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Weight
                                        : {matrimonialProfile.weight}</p>

                                    <p>Interests : {matrimonialProfile.interests}</p>
                                    <p>Current Marital Status : {matrimonialProfile.currentMaritalStatus}</p>
                                    <p>Current Address Of Candidate : {matrimonialProfile.currentAddressOfCandidate}</p>
                                    <p>Current Address Of Family : {matrimonialProfile.currentAddressOfFamily}</p>
                                    <p>Contact Number : {matrimonialProfile.contactNumber}</p>
                                    <p>Immigration Status Of Candidate
                                        : {matrimonialProfile.immigrationStatusOfCandidate}</p>
                                    <p>Highest Education Of Candidate
                                        : {matrimonialProfile.highestEducationOfCandidate}</p>
                                    <p>Professional Details Of Candidate
                                        : {matrimonialProfile.professionalDetailsOfCandidate}</p>
                                    <p>Father FullName : {matrimonialProfile.fatherFullName}</p>
                                    <p>Father Contact Number : {matrimonialProfile.fatherContactNumber}</p>
                                    <p>Mother FullName : {matrimonialProfile.motherFullName}</p>
                                    <p>Father NativeTown : {matrimonialProfile.fatherNativeTown}
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Mother
                                        NativeTown : {matrimonialProfile.motherNativeTown}</p>
                                    <p>Details Of Siblings : {matrimonialProfile.detailsOfSiblings}</p>
                                    <p>Maternal UncleName : {matrimonialProfile.maternalUncleName}</p>
                                    <p>Details Of Mosal : {matrimonialProfile.detailsOfMosal}</p>
                                    <p>Believe In Kundli : {matrimonialProfile.believeInKundli}</p>
                                    <p>Expectation From LifePartner
                                        : {matrimonialProfile.expectationFromLifePartner}</p>
                                    <p>Correct Information : {matrimonialProfile.correctInformation}</p>
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default MatrimonialProfilePage;
