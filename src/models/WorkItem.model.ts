import WorkPicture from './WorkPicture.model';

interface WorkItem {
  name: string;
  children: WorkPicture[];
}

export default WorkItem;
