import Page from './Page.model';

interface AllMarkdownRemark {
  totalCount: number;
  edges: { node: Page }[];
}

export default AllMarkdownRemark;
