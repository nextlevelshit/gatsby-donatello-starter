import React from 'react';
import styled from 'styled-components';
import WorkPicture from '../models/WorkPicture';
import Img from 'gatsby-image';
import config from '../../config/SiteConfig';
import typography from '../utils/typography';
import { media } from '../utils/media';
import { Link } from 'gatsby';
import theme from './../../config/Theme';

const WorkItemLink: any = styled(Link)`
  display: block;
  padding: 0 ${config.gridGutter * 0.5}rem;
  margin-bottom: ${typography.rhythm(0.3)};
  flex: 0 0 25%;
  max-width: 25%;

  @media ${media.tablet} {
    flex: 0 0 33.3333333%;
    max-width: 33.3333333333%;
  }
  @media ${media.phone} {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const WorkItemTitle: any = styled.h3`
  margin-top: ${typography.rhythm(0.4)};
  font-size: ${theme.fontSize.small};
  font-weight: 300;
`;

interface Props {
  data: {
    name: string;
    fields: {
      slug: string;
    };
    children: WorkPicture[];
  };
}

export class WorkItem extends React.PureComponent<Props> {
  public render() {
    const { data } = this.props;

    if (data.children) {
      const image = data.children[0].childImageSharp;

      if (image) {
        return (
          <WorkItemLink to={data.fields.slug}>
            <Img fluid={image.fluid} />
            <WorkItemTitle>{data.name}</WorkItemTitle>
          </WorkItemLink>
        );
      }
      return null;
    }
    return null;
  }
}
