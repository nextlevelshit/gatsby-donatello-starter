import WorkItem from './WorkItem.model';

interface Work {
  title: string;
  items?: [WorkItem];
}

export default Work;
