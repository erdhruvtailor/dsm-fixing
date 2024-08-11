import React from 'react';
import { Image } from 'react-bootstrap';
import noDataImage from '../assets/images/no-data.gif'; // Make sure to place your GIF in the correct path

const NoDataAnimation = () => {
    return (
        <div className="no-data-container">
            <Image src={noDataImage} alt="No Data Available" fluid />
            <h4>No profiles found. Please adjust your search criteria.</h4>
        </div>
    );
};

export default NoDataAnimation;
