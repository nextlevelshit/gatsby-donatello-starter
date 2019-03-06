import React from 'react';
import styled from 'styled-components';
import WorkPicture from '../models/WorkPicture';
import Img from 'gatsby-image';

interface Props {
  data: {
    name: string;
    children: WorkPicture[];
  };
}

const WorkItemContainer: any = styled.div``;

const WorkItemTitle: any = styled.h3``;

export class WorkItem extends React.PureComponent<Props> {
  public render() {
    const { data } = this.props;

    if (data.children) {
      const image = data.children[0].childImageSharp;

      if (image) {
        return (
          <WorkItemContainer>
            <WorkItemTitle>{data.name}</WorkItemTitle>
            <Img fluid={image.fluid} />
          </WorkItemContainer>
        );
      }
      return null;
    }
    return null;
  }
}
