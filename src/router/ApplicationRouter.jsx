import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../router/PrivateRoute';
import Home from '../components/pages/Home';
import LogIn from '../components/pages/LogIn';
import SignUp from '../components/pages/SignUp';
import Dashboard from '../components/pages/Dashboard';
import Learn from '../components/pages/Learn';
import FlashCard from '../components/pages/FlashCard';
import Header from '../components/Header';
import Ranking from '../components/pages/Ranking';
import Challenge from '../components/pages/Challenge';
import Profile from '../components/pages/Profile';

export default function ApplicationRouter() {
    
    return (       
        <Router>
        <Header/>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/" element={<Home />} />
                                
                <Route element={<PrivateRoute/>}> <Route path="/learn" element={<Learn/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/learn/group/:groupId" element={<FlashCard/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/dashboard" element={<Dashboard/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/ranking" element={<Ranking/>} /></Route>
                <Route path="/challenge" element={<Challenge/>} />
                <Route element={<PrivateRoute/>}> <Route path="/profile" element={<Profile/>} /></Route>

            </Routes>
        </Router>
    )
}
