import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../router/PrivateRoute';
import Home from '../components/home/Home';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import Dashboard from '../components/dashboard/Dashboard';
import Learn from '../components/learn/Learn';
import Group from '../components/learn/Group';
import Header from '../ui/Header';
import Ranking from '../components/ranking/Ranking';
import Challenge from '../components/challenge/Challenge';
import AdminDashboard from '../components/admin/AdminDashboard';
import ManageGroups from '../components/admin/AdminManageWord';
import AdminManageGroup from '../components/admin/AdminManageGroup';
import AdminManageWord from '../components/admin/AdminManageWord';

export default function ApplicationRouter() {
    
    return (       
        <Router>
        <Header/>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/" element={<Home />} />
                                
                <Route element={<PrivateRoute/>}> <Route path="/learn" element={<Learn/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="//learn/group/:groupId" element={<Group/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/dashboard" element={<Dashboard/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/ranking" element={<Ranking/>} /></Route>
                <Route path="/challenge" element={<Challenge/>} />
                <Route element={<PrivateRoute/>}> <Route path="/admin" element={<AdminDashboard/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/admin/groups" element={<AdminManageGroup/>} /></Route>
                <Route element={<PrivateRoute/>}> <Route path="/admin/words" element={<AdminManageWord/>} /></Route>

            </Routes>
        </Router>
    )
}
