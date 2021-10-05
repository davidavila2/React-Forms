/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import DetailsView from './DetailsView';
import ListView from './ListView';
import { Todo, emptyTodo } from "./todo";

import {
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Box
} from '@mui/material';

import axios from "axios";

const BASEURL = "https://server-30-x-30.herokuapp.com/items/";
const getUrlWithId = (id: number) => `${BASEURL}${id}`;

function AppToolbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            MDV
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

function App() {
  const [selectedItem, setSelectedItem] = useState<Todo>(emptyTodo);
  const [items, setItems] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get(BASEURL)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const selectItem = (item: Todo) => {
    setSelectedItem(item);
  };

  const resetItem = () => {
    setSelectedItem(emptyTodo);
  };

  const addItem = async (item: Todo) => {
    if (!item) {
      alert('Please fill out form');
    } else {
      setSelectedItem(item);

      try {
        const newItem = (await axios.post(BASEURL, item)).data;
        setItems((currentItems) => (currentItems = [...currentItems, newItem]));
      } catch (error) {
        console.error('ERROR from ADD Item In Parent', error);
      } finally {
        resetItem();
      }
    }
  };

  const updateItem = async (item: Todo) => {
    try {
      await axios.patch(getUrlWithId(item.id), selectedItem);
      setItems(
        (currItems) =>
          (currItems = currItems.map((currItem) =>
            item.id === currItem.id ? { ...item } : currItem
          ))
      );
    } catch (error) {
      console.error('ERROR from Update Item in Parent', error);
    } finally {
      resetItem();
    }
  };

  const deleteItem = async (id: number) => {
    const config = {
      data: {
        id: selectedItem
      }
    }
    try {
      await axios.delete(getUrlWithId(id), config);
      setItems(
        (prevItems) => (prevItems = prevItems.filter((item) => item.id !== id))
      );
    } catch (error) {
      console.error('ERROR from Delete Item in The Parent', error);
    } finally {
      resetItem();
    }
  };

  return (
    <div>
      <AppToolbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
              <ListView items={items} selectItem={selectItem} delete={deleteItem} />
          </Grid>
          <Grid item xs={6}>
            <DetailsView
              item={selectedItem}
              resetItem={resetItem}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
