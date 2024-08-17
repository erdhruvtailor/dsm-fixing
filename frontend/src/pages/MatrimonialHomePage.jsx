import React, {useEffect, useState} from 'react';
// import Slider from 'react-slider';
import {
    Row,
    Col,
    Button,
    Card,
    Form,
    InputGroup,
} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import Meta from '../components/Meta';
import {LinkContainer} from "react-router-bootstrap";
import {
    useGetMatrimonialProfileQuery
} from "../slices/matrimonialProfilesApiSlice";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import NoDataAnimation from '../components/NoDataAnimation';
import {FaPlus, FaFilter} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import LazyLoad from 'react-lazyload';
import {topCountries} from '../utils/preDefinedAttributes';
import "../assets/styles/MatrimonialHomePage.css";
import "../assets/styles/Pagination.css";
import Slider from '@mui/material/Slider'; // Assuming you're using MUI Slider
import moment from 'moment';

// Filter options
import {
    predBelieveInKundli,
    preDietPreference,
    preLifestyleHabits,
    predCurrentMaritalStatus
} from '../utils/preDefinedAttributes';

const MatrimonialHomePage = ({showMyPanel}) => {
    const {pathname} = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchAge, setSearchAge] = useState('');
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState([]);
    const [selectedBelieveInKundli, setSelectedBelieveInKundli] = useState([]);
    const [selectedDietPreference, setSelectedDietPreference] = useState([]);
    const [selectedLifestyleHabits, setSelectedLifestyleHabits] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [ageRange, setAgeRange] = useState([18, 80]);
    const [filtersVisible, setFiltersVisible] = useState(false);

    const isMyPanel = pathname.includes('my-panel');

    const {data, isLoading2, error2} = useGetMatrimonialProfileQuery({
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

    const handleSliderChange = (event, newValue) => {
        setAgeRange(newValue);
    };

    const pageHandler = pageNum => {
        console.log("pageHandler called with:", pageNum);
        if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
            setCurrentPage(pageNum);
            setSkip((pageNum - 1) * limit);
        }
    };

    const Paginate = ({pages, page, onPageChange}) => {
        const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= pages) {
                onPageChange(newPage);
            }
        };

        return (
            <div className="pagination-container">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="pagination-info">
                Page {page} of {pages}
            </span>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pages}
                >
                    Next
                </button>
            </div>
        );
    };

    function calculateAge(birthDate) {
        return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
    }

    const handleSearch = (profiles) => {
        return profiles.filter(profile => {
            const matchesName = searchName === '' || profile.fullName.toLowerCase().includes(searchName.toLowerCase());
            const matchesLocation = selectedCountries.length === 0 || selectedCountries.some(
                country => profile.currentAddressOfCandidate.toLowerCase().includes(country.toLowerCase()) ||
                    profile.currentCountryOfCandidate.toLowerCase().includes(country.toLowerCase())
            );
            // const matchesAge = searchAge === '' || calculateAge(profile.birthDate) === parseInt(searchAge, 10);
            const matchesAge = ageRange.length === 2 && (
                calculateAge(profile.birthDate) >= ageRange[0] &&
                calculateAge(profile.birthDate) <= ageRange[1]
            );
            const age = calculateAge(profile.birthDate);
            const matchesMaritalStatus = selectedMaritalStatus.length === 0 || selectedMaritalStatus.includes(profile.currentMaritalStatus);
            const matchesBelieveInKundli = selectedBelieveInKundli.length === 0 || selectedBelieveInKundli.includes(profile.believeInKundli);
            const matchesDietPreference = selectedDietPreference.length === 0 || selectedDietPreference.includes(profile.dietPreference);
            const matchesLifestyleHabits = selectedLifestyleHabits.length === 0 || selectedLifestyleHabits.some(habit => profile.lifestyleHabits.includes(habit));
            return matchesName && matchesLocation && matchesAge && matchesMaritalStatus && matchesBelieveInKundli && matchesDietPreference && matchesLifestyleHabits && (age >= ageRange[0] && age <= ageRange[1]);
        });
    };

    const filteredProfiles = data ? handleSearch(data.matrimonialProfiles) : [];

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <Meta title={'Matrimonial Profile'}/>
                    <h2 className="page-title">Matrimonial Candidate Detail</h2>
                </Col>
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
                                <FaPlus size={20} className="me-2"/>
                                Add Profile
                            </Button>
                        </LinkContainer>

                        <Button onClick={() => setFiltersVisible(!filtersVisible)}
                                className="filter-toggle-btn btn-responsive">
                            <FaFilter size={20}/>
                            {filtersVisible ? ' Hide Filters' : ' Show Filters'}
                        </Button>
                    </div>
                </Col>
            </Row>

            {filtersVisible && (
                <Row className="mb-4">
                    {/*<Col xs={12} md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="custom-input"
                        />
                    </Col>*/}
                    <Col xs={12} md={4}>
                        <Form.Group>
                            <Form.Label>Filter by Location</Form.Label>
                            {Object.entries(topCountries).map(([code, name]) => (
                                <Form.Check
                                    key={code}
                                    type="checkbox"
                                    id={`location-${code}`}
                                    label={name}
                                    value={name}
                                    checked={selectedCountries.includes(name)}
                                    onChange={(e) => {
                                        const {checked, value} = e.target;
                                        setSelectedCountries(prev =>
                                            checked
                                                ? [...prev, value]
                                                : prev.filter(country => country !== value)
                                        );
                                    }}
                                />
                            ))}
                        </Form.Group>
                    </Col>
                    {/*<Col xs={12} md={4}>
                        <Form.Control
                            type="number"
                            placeholder="Search by age"
                            value={searchAge}
                            onChange={(e) => setSearchAge(e.target.value)}
                            className="custom-input"
                        />
                    </Col>*/}

                    <Col xs={12} md={4}>
                        <Form.Group>
                            <Form.Label>Filter by Age</Form.Label>
                            <InputGroup>
                                <Slider
                                    value={ageRange}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="auto"
                                    renderTrack={(props) => <div {...props} className="slider-track"/>}
                                    renderThumb={(props) => <div {...props} className="slider-thumb"/>}
                                />
                                <Form.Control
                                    type="text"
                                    value={`${ageRange[0]} - ${ageRange[1]}`}
                                    readOnly
                                    className="age-range-display"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>Marital Status</Form.Label>
                            {Object.entries(predCurrentMaritalStatus).map(([key, value]) => (
                                <Form.Check
                                    key={key}
                                    type="checkbox"
                                    id={`marital-status-${key}`}
                                    label={value}
                                    value={key}
                                    onChange={(e) => {
                                        const {checked, value} = e.target;
                                        setSelectedMaritalStatus(prev =>
                                            checked
                                                ? [...prev, value]
                                                : prev.filter(status => status !== value)
                                        );
                                    }}
                                    checked={selectedMaritalStatus.includes(key)}
                                />
                            ))}
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>Believe in Kundli</Form.Label>
                            {Object.entries(predBelieveInKundli).map(([key, value]) => (
                                <Form.Check
                                    key={key}
                                    type="checkbox"
                                    id={`believe-in-kundli-${key}`}
                                    label={value}
                                    value={key}
                                    onChange={(e) => {
                                        const {checked, value} = e.target;
                                        setSelectedBelieveInKundli(prev =>
                                            checked
                                                ? [...prev, value]
                                                : prev.filter(believe => believe !== value)
                                        );
                                    }}
                                    checked={selectedBelieveInKundli.includes(key)}
                                />
                            ))}
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>Diet Preference</Form.Label>
                            {Object.entries(preDietPreference).map(([key, value]) => (
                                <Form.Check
                                    key={key}
                                    type="checkbox"
                                    id={`diet-preference-${key}`}
                                    label={value}
                                    value={key}
                                    onChange={(e) => {
                                        const {checked, value} = e.target;
                                        setSelectedDietPreference(prev =>
                                            checked
                                                ? [...prev, value]
                                                : prev.filter(diet => diet !== value)
                                        );
                                    }}
                                    checked={selectedDietPreference.includes(key)}
                                />
                            ))}
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>Lifestyle Habits</Form.Label>
                            {Object.entries(preLifestyleHabits).map(([key, value]) => (
                                <Form.Check
                                    key={key}
                                    type="checkbox"
                                    id={`lifestyle-habits-${key}`}
                                    label={value}
                                    value={key}
                                    onChange={(e) => {
                                        const {checked, value} = e.target;
                                        setSelectedLifestyleHabits(prev =>
                                            checked
                                                ? [...prev, value]
                                                : prev.filter(habit => habit !== value)
                                        );
                                    }}
                                    checked={selectedLifestyleHabits.includes(key)}
                                />
                            ))}
                        </Form.Group>
                    </Col>
                </Row>
            )}

            {isLoading2 ? (
                <Loader/>
            ) : error2 ? (
                <NoDataAnimation message="Unable to fetch data"/>
            ) : (
                <>
                    {filteredProfiles.length === 0 ? (
                        <NoDataAnimation message="No Data Available"/>
                    ) : (
                        <Row>
                            {filteredProfiles.map((profile) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={profile._id} className="align-items-stretch">
                                    <Link to={`/matrimonialProfile/${profile._id}`} className="card-link">
                                        <Card className="my-3 p-3 rounded d-flex flex-column card">
                                            <LazyLoad height={200}>
                                                <Card.Img src={profile.image} alt={profile.fullName}
                                                          className="card-img"/>
                                            </LazyLoad>
                                            <Card.Body className="flex-grow-1 card-body position-relative">
                                                <Card.Title
                                                    className="card-title d-flex justify-content-between align-items-center">
                                                    {profile.fullName}
                                                    {/* Conditionally render the edit icon */}
                                                    {showMyPanel && (
                                                        <a href={`/matrimonialProfile/update/${profile._id}`}
                                                           className="edit-icon-link">
                                                            <FaEdit size={20}/>
                                                        </a>
                                                    )}
                                                </Card.Title>
                                                <Card.Text className="card-text">
                                                    {profile.currentAddressOfCandidate}<br/>
                                                    {calculateAge(profile.birthDate)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    )}
                    <Paginate
                        pages={totalPage}
                        page={currentPage}
                        onPageChange={pageHandler}
                    />
                </>
            )}
        </>
    );
};

export default MatrimonialHomePage;
