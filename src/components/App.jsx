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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {

  
  }, [])
  

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
        <Searchbar onSubmit={this.formSubmit} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && hits.length % 12 === 0 && hits.length !== 0 && 
        <Button onClick={this.loadMoreClick} />}
      </Box>
    );
}
// export class App extends Component {
//   state = {
//     page: 1,
//     query: '',
//     hits: [],
//     status: 'idle',
//   };

//   async componentDidUpdate(_, prevState) {
//     try {
//       const prevPage = prevState.page;
//       const currentPage = this.state.page;
//       const prevQuery = prevState.query;
//       const currentQuery = this.state.query;

//       if (prevPage !== currentPage || prevQuery !== currentQuery) {
//         this.setState({ status: 'pending' });
//         const data = await fetchImages(currentQuery, currentPage);
//         const { hits, total } = data;

//         if (total === 0 || (hits.length === 0 && hits.totalHits > 0)) {
//           this.setState({ status: 'idle' });
//           return;
//         }
//           this.setState({ status: 'resolved' });
//           this.setState(prevState => ({
//           hits: [...prevState.hits, ...hits]
//           }));
//           return;
//         }
//     } catch (error) {
//       console.log(error);
//       this.setState({ status: 'rejected' });
//     }
//   }

//   formSubmit = query => {
//     this.setState({
//       page: 1,
//       query: query,
//       hits: [],
//       status: 'idle',
//     });
//   };

//   loadMoreClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { hits, status } = this.state;
//     return (
//       <Box
//         display="grid"
//         gridTemplateColumns="1fr"
//         gridGap="16px"
//         pb="24px">
//         <GlobalStyle />
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           theme={"colored"}
//         />
//         <Searchbar onSubmit={this.formSubmit} />
//         {hits.length > 0 && <ImageGallery hits={hits} />}
//         {status === 'pending' && <Loader />}
//         {status === 'resolved' && hits.length % 12 === 0 && hits.length !== 0 && 
//         <Button onClick={this.loadMoreClick} />}
//       </Box>
//     );
//   }
// };
