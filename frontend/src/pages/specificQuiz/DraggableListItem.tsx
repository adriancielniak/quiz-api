import { Draggable } from 'react-beautiful-dnd';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Item } from './typings';

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)'
  },
  listItem: {
    background: 'white',
    border: '1px solid lightgrey',
    borderRadius: '10px',
    marginBottom: '8px',
  },
  listItemText: {
    color: 'black',
  },
});

export type DraggableListItemProps = {
  item: Item;
  index: number;
};

const DraggableListItem = ({ item, index }: DraggableListItemProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${classes.listItem} ${snapshot.isDragging ? classes.draggingListItem : ''}`}
        >
          <ListItemText primary={item.answer_content} className={classes.listItemText}/>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;