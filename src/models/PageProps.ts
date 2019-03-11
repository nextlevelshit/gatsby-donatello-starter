import PathContext from './PathContext.model';
import PageResources from './PageResources';
import Data from './Data.model';

interface PageProps {
  data: Data;
  location: Location;
  pageResources?: PageResources;
  pathContext: PathContext;
}

export default PageProps;
