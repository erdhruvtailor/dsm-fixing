import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Button,
    Card,
    Form,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Meta from '../components/Meta';
import { LinkContainer } from "react-router-bootstrap";
import {
    useGetMatrimonialProfileQuery
} from "../slices/matrimonialProfilesApiSlice";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import NoDataAnimation from '../components/NoDataAnimation'; // Import the NoDataAnimation component
import { FaPlus, FaPencil, FaFilter } from "react-icons/fa6";
import moment from "moment";
import "../assets/styles/MatrimonialHomePage.css"; // Custom styles

const MatrimonialHomePage = ({ showMyPanel }) => {
    const { pathname } = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchAge, setSearchAge] = useState('');
    const [filtersVisible, setFiltersVisible] = useState(false); // State for filter visibility

    const isMyPanel = pathname.includes('my-panel');

    const { data, isLoading2, error2 } = useGetMatrimonialProfileQuery({
        limit,
        skip,
        isMyPanel
    });

    useEffect(() => {
        if (data) {
            setTotal(data.total);
            setTotalPage(Math.ceil(data.total / limit));
        }
    }, [data, limit]);

    const pageHandler = pageNum => {
        if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
            setCurrentPage(pageNum);
            setSkip((pageNum - 1) * limit);
        }
    };

    function calculateAge(birthDate) {
        return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
    }

    const handleSearch = (profiles) => {
        return profiles.filter(profile => {
            const matchesName = searchName === '' || profile.fullName.toLowerCase().includes(searchName.toLowerCase());
            const matchesLocation = searchLocation === '' || profile.currentAddressOfCandidate.toLowerCase().includes(searchLocation.toLowerCase()) || profile.currentCountryOfCandidate.toLowerCase().includes(searchLocation.toLowerCase());
            const matchesAge = searchAge === '' || calculateAge(profile.birthDate) === parseInt(searchAge, 10);
            return matchesName && matchesLocation && matchesAge;
        });
    };

    const filteredProfiles = data ? handleSearch(data.matrimonialProfiles) : [];

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <Meta title={'Matrimonial Profile'} />
                    <h2 className="page-title">Matrimonial Candidate Detail</h2>
                </Col>
            {/*</Row>
            <Row className="mb-4">*/}
                <Col className='text-end'>
                    <div className="button-container">
                        {showMyPanel ? (
                            <LinkContainer to="/matrimonialHomePage">
                                <Button className="my-3 custom-btn btn-responsive">
                                    All Matrimonial Profile
                                </Button>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to="/matrimonialHomePage/my-panel">
                                <Button className="my-3 custom-btn btn-responsive">
                                    My Matrimonial Post
                                </Button>
                            </LinkContainer>
                        )}

                        <LinkContainer to="/matrimonialProfile/create">
                            <Button className="my-3 custom-btn btn-responsive">
                                <FaPlus size={20} className="me-2" />
                                Add Profile
                            </Button>
                        </LinkContainer>

                        <Button onClick={() => setFiltersVisible(!filtersVisible)} className="filter-toggle-btn btn-responsive">
                            <FaFilter size={20} />
                            {filtersVisible ? ' Hide Filters' : ' Show Filters'}
                        </Button>
                    </div>
                </Col>
            </Row>

            {filtersVisible && (
                <Row className="mb-4">
                    <Col xs={12} md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="custom-input"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Search by location"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="custom-input"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Control
                            type="number"
                            placeholder="Search by age"
                            value={searchAge}
                            onChange={(e) => setSearchAge(e.target.value)}
                            className="custom-input"
                        />
                    </Col>
                </Row>
            )}

            {isLoading2 ? (
                <Loader />
            ) : error2 ? (
                ''
            ) : filteredProfiles.length > 0 ? (
                <Row>
                    {filteredProfiles.map(matrimonialProfile => (
                        <Col key={matrimonialProfile._id} sm={12} md={6} lg={4} xl={3}>
                            <Card className='my-3 p-3 rounded text-center position-relative custom-card'>
                                <Link
                                    to={`/matrimonialProfile/${matrimonialProfile._id}`}
                                    className='text-dark'
                                >
                                    <Card.Img
                                        variant='top'
                                        src={matrimonialProfile.image}
                                        className='custom-card-img'
                                    />
                                    <Card.Body>
                                        <Card.Title as='div' className='product-title'>
                                            <h3><strong>{matrimonialProfile.fullName}</strong></h3>
                                        </Card.Title>
                                        <Card.Text as='p'>{matrimonialProfile.currentAddressOfCandidate}, {matrimonialProfile.currentCountryOfCandidate}</Card.Text>
                                        <Card.Text as='p'>{calculateAge(matrimonialProfile.birthDate)} Years</Card.Text>
                                    </Card.Body>
                                </Link>

                                {showMyPanel && (
                                    <LinkContainer to={`/matrimonialProfile/update/${matrimonialProfile._id}`}>
                                        <Button className="circular-button positioned-button custom-btn">
                                            <FaPencil size={10} />
                                        </Button>
                                    </LinkContainer>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <NoDataAnimation />
            )}

            {totalPage > 1 && (
                <Paginate
                    currentPage={currentPage}
                    totalPage={totalPage}
                    pageHandler={pageHandler}
                />
            )}
        </>
    );
};

export default MatrimonialHomePage;
