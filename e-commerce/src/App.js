import NavBar from './components/navBar/navBar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
function App() {


  return (
    <>
    <Router>
      <NavBar/>
      <ErrorPage/>
      <Footer/>
    </Router>
    </>
  )
}

export default App;