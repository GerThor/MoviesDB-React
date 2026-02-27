import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import Movie from "./components/ui/Movie.jsx";
import MovieInfo from "./pages/MovieInfo.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/MoviesDB-React" element={<Home />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:movieId" element={<MovieInfo />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
