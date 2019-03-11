import Heading from './Heading.model';

interface PathContext {
  id: string;
  headings?: Heading[];
  next?: any;
  prev?: any;
}

export default PathContext;
