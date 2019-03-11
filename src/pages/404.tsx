import * as React from 'react';
import { Container, Layout, Title } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';

export default class NotFoundPage extends React.Component<any> {
  public render() {
    return (
      <Layout>
        <Helmet title={`404 Not Found | ${config.siteTitle}`} />
        <Container>
          <Title>NOT FOUND</Title>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Container>
      </Layout>
    );
  }
}
