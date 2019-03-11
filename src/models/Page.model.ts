import Frontmatter from './Frontmatter.model';

interface Page {
  id: number;
  excerpt?: string;
  html: string;
  frontmatter: Frontmatter;
  fields: {
    slug: string;
  };
}

export default Page;
