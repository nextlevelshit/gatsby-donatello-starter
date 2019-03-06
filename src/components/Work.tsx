import React from 'react';
import config from '../../config/SiteConfig';
import styled from 'styled-components';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import { Title } from './Title';
import { WorkItem } from './WorkItem';

interface Props {
  data: any[];
}

const WorkCategoryTitle: any = styled.h2``;

const WorkCategoryContainer: any = styled.div``;

export class Work extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;
    const categories = data.map(d => d.node);

    return (
      <Container>
        <Row>
          <Column width={{ default: config.defaultColumnsLeft }}>
            <aside>Sidebar</aside>
          </Column>
          <Column width={{ default: config.defaultColumnsRight }}>
            <Title>Work</Title>

            {categories.map((category, index) => (
              <WorkCategoryContainer key={index}>
                <WorkCategoryTitle>{category.name}</WorkCategoryTitle>
                {category.children.map((item, index) => (
                  <WorkItem data={item} key={index} />
                ))}
              </WorkCategoryContainer>
            ))}
          </Column>
        </Row>
      </Container>
    );
  }
}
