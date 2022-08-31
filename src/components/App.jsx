import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from "./Box";
import { GlobalStyle } from "./GlobalStyle";
import { fetchImages } from "services/api";
import Searchbar from "./SearchBar";
import Loader from "./Loader";
import ImageGallery from "./ImageGallery";
import Button from "./Button";

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }
    (async function getImages() {
      try {
        setStatus('pending');
        const data = await fetchImages(query, page);
        const { hits, total } = data;
        
        if (total === 0 || (hits.length === 0 && hits.totalHits > 0)) {
          setStatus('idle');
          return;
        }
        setStatus('resolved');
        setHits(prevHits => [...prevHits, ...hits]);
        return;

      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    })();
  }, [page, query]);

  const formSubmit = query => {
    setQuery(query);
    setPage(1);
    setHits([]);
    setStatus('idle');
  };
  
  const loadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr"
      gridGap="16px"
      pb="24px">
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme={"colored"}
      />
      <Searchbar onSubmit={formSubmit} />
      {hits.length > 0 && <ImageGallery hits={hits} />}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && hits.length % 12 === 0 && hits.length !== 0 &&
        <Button onClick={loadMoreClick} />}
    </Box>
  );
};