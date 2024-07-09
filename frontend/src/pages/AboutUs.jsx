import React, { useEffect, useState } from 'react';

import {Row, Col, Image} from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import ServerError from '../components/ServerError';
import Meta from '../components/Meta';

const AboutUs = () => {

  const { data, isLoading, error } = useGetProductsQuery({});

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
          <>

            <br/>
            <br/>

            <h2>NRIs Darji community common platform (NDCCP)</h2>

            <br/>
            <br/>

            <Row>
              <Col md={7}>
                <h4>

                  The Noble objective of the Web Application is to serve Darji community by providing a Common NRIs
                  Darji
                  community platform for Businesses, Connections, Events, Donations and Matrimonial.

                  {/*The Noble objective of the group is to serve Darji community by providing a common platform for educated and professional NRIs (from USA,Canada, Africa, UK, Australia,NZ and more) to find their life partner. All group members are requested to follow below rules:

            1) We encourage to share Biodata copies with picture attached to it and avoid sharing pictures separately.
            2) This group is strictly for Matrimonial purpose, does not allow personal messages, promotion of groups, blogs,channels, services or personal Agenda.
            3) No comments to me made on profiles posted.
            4) Admin can remove anyone without notice.*/}

                </h4>

                <br/>
                <br/>

                <h4>

                  વેબ એપ્લિકેશનનો ઉમદા ઉદ્દેશ્ય વ્યવસાયો, જોડાણો, ઇવેન્ટ્સ, દાન અને લગ્ન માટે એક સામાન્ય NRIs દરજી
                  સમુદાય
                  પ્લેટફોર્મ પ્રદાન કરીને દરજી સમુદાયની સેવા કરવાનો છે.

                  {/*આ ગ્રુપ ઉમદા ઉદ્દેશ્ય શિક્ષિત અને વ્યાવસાયિક એનઆરઆઈ (યુએસએ, કેનેડા, આફ્રિકા, યુ.કે., ઓસ્ટ્રેલિયા, એનઝેડ અને વધુમાંથી) તેમના જીવન સાથી શોધવા માટે એક સામાન્ય પ્લેટફોર્મ પ્રદાન કરીને દરજી સમુદાયની સેવા કરવાનો છે. ગ્રુપના તમામ સભ્યોને નીચેના નિયમોનું પાલન કરવા વિનંતી કરવામાં આવે છે.
            1) અમે બાયોડેટાની નકલો ફોટો સાથે શેર કરવા પ્રોત્સાહિત કરીએ છીએ અને ચિત્રોને અલગથી શેર કરવાનું ટાળીએ છીએ.
            2) આ જૂથ સખત રીતે વૈવાહિક હેતુ માટે છે, વ્યક્તિગત સંદેશાઓ, જૂથોના પ્રમોશન, બ્લોગ્સ, ચેનલો, સેવાઓ અથવા વ્યક્તિગત એજન્ડાને મંજૂરી આપતું નથી.
            3) પોસ્ટ કરેલી પ્રોફાઇલ્સ પર કોઈ ટિપ્પણી કરવી નઈ.
            4) એડમિન કોઈપણને સૂચના વિના ગ્રુપ માંથી  રીમોવ કરી શકે છે.*/}

                </h4>

                <img src="aboutus32.jpg" alt="" width="100%"/>

              </Col>
              <Col md={5}>
                <img src="aboutus2.png" alt="" width="100%"/>
              </Col>
            </Row>
            <center><img src="aboutus4.jpg" alt="" width="20%"/></center>


          </>
      )}
    </>
  );
};

export default AboutUs;
