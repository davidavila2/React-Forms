import { Todo } from "./todo";

import {
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function ListView(props: { items: Todo[]; selectItem: (arg0: any) => void; delete: (arg1: any) => void }) {
  if (!props.items.length) {
    return <Typography sx={{ mt: 4, mb: 2 }} variant="h1" component="div">Items</Typography>;
  } else {
    return (
      <>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
          Items
        </Typography>
        <List>
          {
            props.items.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => props.selectItem(item)}>
                <ListItemText
                primary={item.name}
                secondary={item.description}/>
              </ListItem>
            ))
          }
        </List>
      </>
    );
  }
}

export default ListView