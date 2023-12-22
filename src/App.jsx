import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import BrandIcons from './components/BrandIcons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Trending from './components/Trending';
import Products from './components/Products';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary'; // Adjust the path as necessary

export default function App() {
    return (
        <Router>
            <div className='page'>
                <ErrorBoundary>
                    <NavBar />
                    <div className='background'>
                        <div className='search-title'>
                            <div className='title'>The Sneaks App</div>
                            <div className='subtitle'>Search Sneakers and Compare Prices</div>
                        </div>
                        <SearchBar />
                        <BrandIcons />
                    </div>
                </ErrorBoundary>
                <Routes>
                    <Route exact path='/' element={
                        <ErrorBoundary>
                            <Trending />
                        </ErrorBoundary>
                    } />
                    <Route path='/search/:key' element={
                        <ErrorBoundary>
                            <Products />
                        </ErrorBoundary>
                    } />
                </Routes>
            </div>
        </Router>
    );
}
