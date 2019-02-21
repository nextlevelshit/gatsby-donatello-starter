import React from 'react';
import Helmet from 'react-helmet';
// import { Link } from 'gatsby';
import { Layout } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';

export default class ImpressumPage extends React.Component<PageProps> {
  render() {
    return (
      <Layout>
        <Helmet title={`Impressum | ${config.siteTitle}`} />
      </Layout>
    );
  }
}
