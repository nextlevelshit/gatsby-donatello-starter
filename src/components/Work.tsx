import React from 'react';
import config from '../../config/SiteConfig';
import styled from 'styled-components';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import { Title } from './Title';
import { WorkItem } from './WorkItem';
import { Link } from 'gatsby';
import typography from '../utils/typography';

interface Props {
  data: {
    node: {
      name: string;
      children: any[];
    }[];
  }[];
}

const WorkCategoryTitle: any = styled.h2`
  padding-top: ${typography.rhythm(1)};
`;

const WorkCategoryContainer: any = styled.div``;

const WorkItemRow: any = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -${config.gridGutter * 0.5}rem;
`;

const Sidebar: any = styled.aside`
  position: sticky;
  top: ${typography.rhythm(1)};
  margin-top: ${typography.rhythm(1)};

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

export class Work extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;
    const categories = data.map(d => d.node);

    return (
      <Container>
        <Row>
          <Column width={{ default: config.defaultColumnsLeft, phone: 0, tablet: 0 }}>
            <Sidebar>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link to={`/#${category.name}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </Sidebar>
          </Column>
          <Column width={{ default: config.defaultColumnsRight, phone: 12, tablet: 12 }}>
            <Title>Work</Title>

            {categories.map((category, index) => (
              <WorkCategoryContainer key={index}>
                <WorkCategoryTitle id={category.name}>{category.name}</WorkCategoryTitle>
                <WorkItemRow>
                  {category.children.map((item, index) => (
                    <WorkItem data={item} key={index} />
                  ))}
                </WorkItemRow>
              </WorkCategoryContainer>
            ))}
          </Column>
        </Row>
      </Container>
    );
  }
}
