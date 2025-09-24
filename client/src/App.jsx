import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-4">
              <Link 
                to="/" 
                className="font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                className="font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Favorites
              </Link>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
