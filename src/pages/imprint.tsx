import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, Header, Button, Content, SectionTitle } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';

export default class IndexPage extends React.Component<PageProps> {
  render() {
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
      </Layout>
    );
  }
}
