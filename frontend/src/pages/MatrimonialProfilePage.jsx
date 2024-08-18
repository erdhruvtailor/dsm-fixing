import React, {useState} from 'react';
import {
    Row,
    Col,
    ListGroup,
    Button,
    Image,
    Modal,
    Card,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {format, parseISO} from 'date-fns';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Meta from '../components/Meta';
import {
    useGetMatrimonialProfileDetailsQuery,
} from "../slices/matrimonialProfilesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {FaBackward, FaEdit, FaFilePdf} from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "../assets/styles/MatrimonialProfile.css";

const MatrimonialProfilePage = () => {
    const {id: matrimonialProfileId} = useParams();
    const {userInfo} = useSelector(state => state.auth);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        data: matrimonialProfile,
        isLoading,
        error
    } = useGetMatrimonialProfileDetailsQuery(matrimonialProfileId);

    let formattedBirthDate = "";
    if (matrimonialProfile?.birthDate) {
        const isoDateString = matrimonialProfile.birthDate;
        const parsedDate = parseISO(isoDateString);
        formattedBirthDate = format(parsedDate, 'MMM dd, yyyy');
    }

    const generatePDF = () => {
        const input = document.getElementById('profile-content');
        html2canvas(input, {scale: 2}).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${matrimonialProfile.fullName}.pdf`);
        });
    };

    return (
        <>
            <Row className="align-items-center">
                <Col xs={4}>
                    <Meta title={'Matrimonial Profile'}/>
                    <Link to="/matrimonialHomePage" className="btn btn-light my-3">
                        <FaBackward size={20}/> &nbsp; Back
                    </Link>
                </Col>

                <Col className="d-flex justify-content-end" xs={8}>
                    {matrimonialProfile && (
                        <div className="d-flex align-items-center">
                            {userInfo.userId === matrimonialProfile.user && (
                                <a
                                    href={`/matrimonialProfile/update/${matrimonialProfile._id}`}
                                    className="btn btn-outline-primary my-3 mx-2 d-flex align-items-center"
                                >
                                    <FaEdit size={20}/> &nbsp; Edit
                                </a>
                            )}

                            <Button
                                variant="primary"
                                onClick={generatePDF}
                                className="my-3 d-flex align-items-center"
                            >
                                <FaFilePdf size={20}/> &nbsp; Download PDF
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>


            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div id="profile-content">
                    {matrimonialProfile && (
                        <Meta title={matrimonialProfile.fullName} description={matrimonialProfile.fullName}/>
                    )}

                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <div style={{
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {matrimonialProfile && (
                                            <Image
                                                src={matrimonialProfile.image}
                                                alt={matrimonialProfile.fullName}
                                                fluid
                                                style={{width: '100%', height: 'auto', cursor: 'pointer'}}
                                                onClick={handleShow}
                                            />
                                        )}
                                    </div>

                                    <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" centered>
                                        <Modal.Body
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '100%'
                                            }}
                                        >
                                            {matrimonialProfile && (
                                                <img
                                                    src={matrimonialProfile.image}
                                                    alt={matrimonialProfile.fullName}
                                                    style={{width: '100%', height: 'auto'}}
                                                />
                                            )}
                                        </Modal.Body>
                                    </Modal>
                                </Col>
                                <Col md={8}>
                                    <Card>
                                        <Card.Header as="h3">{matrimonialProfile?.fullName}</Card.Header>
                                        <Card.Body>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <b>Birth Information:</b><br/>
                                                    <p>Birth Date: {formattedBirthDate}</p>
                                                    <p>Birth Time: {matrimonialProfile?.birthTime}
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Birth
                                                        Place: {matrimonialProfile?.birthPlace}
                                                    </p>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <b>Physical appearance:</b><br/>
                                                    <p>Height: {matrimonialProfile?.height}
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Weight: {matrimonialProfile?.weight}
                                                    </p>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <b>Current Information:</b><br/>
                                                    <p>Marital Status: {matrimonialProfile?.currentMaritalStatus}</p>
                                                    <p>Address Of
                                                        Candidate: {matrimonialProfile?.currentAddressOfCandidate}</p>
                                                    <p>Address Of
                                                        Family: {matrimonialProfile?.currentAddressOfFamily}</p>
                                                    <p>Contact Number: {matrimonialProfile?.contactNumber}</p>
                                                    <p>Immigration
                                                        Status: {matrimonialProfile?.immigrationStatusOfCandidate}</p>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <b>Family Information:</b><br/>
                                                    <p>Father FullName: {matrimonialProfile?.fatherFullName}</p>
                                                    <p>Father Contact
                                                        Number: {matrimonialProfile?.fatherContactNumber}</p>
                                                    <p>Mother FullName: {matrimonialProfile?.motherFullName}</p>
                                                    <p>Father NativeTown: {matrimonialProfile?.fatherNativeTown}
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Mother
                                                        NativeTown: {matrimonialProfile?.motherNativeTown}
                                                    </p>
                                                    <p>Details Of Siblings: {matrimonialProfile?.detailsOfSiblings}</p>
                                                    <p>Maternal UncleName: {matrimonialProfile?.maternalUncleName}</p>
                                                    <p>Details Of Mosal: {matrimonialProfile?.detailsOfMosal}</p>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <b>Education:</b><br/>
                                                    <p>{matrimonialProfile?.highestEducationOfCandidate}</p>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <b>Profession/Occupation:</b><br/>
                                                    <p>{matrimonialProfile?.professionalDetailsOfCandidate}</p>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <b>Interests:</b><br/>
                                                    <p>{matrimonialProfile?.interests}</p>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <b>Believe In Kundli:</b><br/>
                                                    <p>{matrimonialProfile?.believeInKundli}</p>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <b>Expectation From Life Partner:</b><br/>
                                                    <p>{matrimonialProfile?.expectationFromLifePartner}</p>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    );
};

export default MatrimonialProfilePage;
