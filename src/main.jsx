import React from 'react'
import ReactDOM from 'react-dom/client'
import Row from './components/Row';
import requests from './requests';
import Banner from './components/Banner'
import Nav from './components/Nav'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <div className="App">
      <Nav />
      <Banner/>
      {/* <h1 className='app-h1'>NUTFLEX</h1> */}
    <Row title={"NUTFLEX ORIGINALS"} fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true}/>
    <Row title={"Trending Now"} fetchUrl={requests.fetchTrending}/>
    <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated}/>
    <Row title={"Action Movies"} fetchUrl={requests.fetchActionMovies}/>
    <Row title={"Comedy"} fetchUrl={requests.fetchComedyMovies}/>
    <Row title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies}/>
    <Row title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies}/>
    <Row title={"Documentaries"} fetchUrl={requests.fetchDocumentaries}/>
    </div>
  
)
