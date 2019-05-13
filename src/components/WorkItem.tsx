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
  padding: ${config.gridGutter}px ${config.gridGutter * 0.5}px;
  flex: 0 0 25%;
  max-width: 25%;
  transition: all 0ms;
  background: ${config.backgroundColor};
  position: sticky;
  top: ${typography.rhythm(1)};

  @media ${media.tablet} {
    top: 0;
    flex: 0 0 33.3333333%;
    max-width: 33.3333333333%;
  }

  @media ${media.phone} {
    top: 0;
    flex: 0 0 100%;
    max-width: 100%;
  }

  &:hover,
  &:focus {
    h3 {
      color: ${theme.colors.grey.dark};
    }
  }

  h3 {
    border-top: 1px solid transparent;
    margin: ${typography.rhythm(0.4)} 0;
    padding: 0 0.5rem;
    font-size: ${typography.rhythm(0.5)};
    min-height: ${typography.rhythm(1.5)};
    line-height: ${typography.rhythm(0.5)};
  }

  .gatsby-image-wrapper div {
    padding-bottom: 150% !important;
  }
`;

const WorkItemTitle: any = styled.h3`
  margin-top: ${typography.rhythm(0.4)};
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.grey.default};
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
