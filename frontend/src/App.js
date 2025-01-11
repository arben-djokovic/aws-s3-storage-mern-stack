import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<CreatePost />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
