import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'NDCCP | NRIs Darji community common platform',
  description:
    'Common NRIs Darji community platform for Businesses, Connections, Events, Donations and Matrimonial.',
  keywords:
    'NRIs Darji community, Common Platform, Businesses, Connections, Events, Donations and Matrimonial'
};

export default Meta;
