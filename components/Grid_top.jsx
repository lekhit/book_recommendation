import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Mycard from './card';
//import Masonry from '@mui/lab/Masonry';
import { Grid, Button } from '@mui/material';
import Navbar from './navBar';
import InfiniteScroll from 'react-infinite-scroller';
import Mysample from './sample';
import Loading from './loading';
var axios = require('axios').default;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: 'lightblue',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'blue',
    opacity: [0.9, 0.8, 0.7],
  },
  onClick: {},
}));

export default function FixedColumns() {
  const [articles, setArticles] = useState(Mysample);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);

  const [progress, setProgress] = useState(10);

  const updateBooks = async () => {
    setLoading(true);
    var options = {
      method: 'GET',
      url: 'https://rem4.lekhitborole.repl.co',
      params: { page: page },
    };
    setProgress(30);
    axios
      .request(options)
      .then(function (response) {
        setProgress(70);
        setArticles(response.data);
        console.log(response);
        setMore(false);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });

    //let parsedData = await data.json();
    //console.log(parsedData);
    //setArticles(parsedData.results);
  };

  const fetchMore = async () => {
    if (!loading) {
      setPage(page + 1);

    }
  };

  //console.log(articles);
  return (
    <>
      {loading && (
        <Loading
          progress={progress}
          setProgress={setProgress}
          setLoading={setLoading}
        />
      )}
      <Navbar />

      <Button onClick={updateNews}> start</Button>
      <Box sx={{ minHeight: 253 }}>
        <InfiniteScroll
          loadMore={fetchMore}
          hasMore={more}
          loader={
            <Loading
              progress={progress}
              setProgress={setProgress}
              setLoading={setLoading}
            />
          }
          useWindow={false}
        >
          <Grid
            container
            justifyContent="space-around"
            spacing={0.5}
            alignItems="stretch"
          >
            {Mysample.map((height, index) => (
              <Grid key={index} sx={{ p: 2 }}>
                <Item>
                  {' '}
                  <Mycard key={index} article={height} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Box>
      <Button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </Button>
    </>
  );
}
