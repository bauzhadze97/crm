import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import SignUpPage from './pages/SignUp';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import VacationPage from './pages/VacationPage';
import BusinessPage from './pages/BusinessPage';
import ProcurementPage from './pages/ProcurementPage';
import AccountPage from './pages/AccountPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataProvider from './components/hoc/DataProvider';
import AdminPage from './pages/AdminPage';
import HeadPage from './pages/HeadPage';
import ProtectedRoute from './components/ProtectedRoute';
import CalendarPage from './pages/CalendarPage';
import DailyTaskReportPage from './pages/DailyTaskReportPage';
import CreatedDailyTaskPage from './pages/CreatedDailyTaskPage';
import MakeCommentPage from './pages/MakeCommentPage';
import MakeDocsPage from './pages/MakeDocsPage';
import HrPage from './pages/HrPage';
import DocumentStatusPage from './pages/DocumentStatusPage';
import HrApprovalPage from './pages/HrApprovalPage';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<AccountPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vacation" 
            element={
              <ProtectedRoute>
                <VacationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/business" 
            element={
              <ProtectedRoute>
                <BusinessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/procurement" 
            element={
              <ProtectedRoute>
                <ProcurementPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/head" 
            element={
              <ProtectedRoute>
                <HeadPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-daily" 
            element={
              <ProtectedRoute>
                <DailyTaskReportPage/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/daily-tasks" 
            element={
              <ProtectedRoute>
                <CreatedDailyTaskPage/>
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/make-comment/:id" 
            element={
              <ProtectedRoute>
                <MakeCommentPage/>
              </ProtectedRoute>
            } 
          />
                  <Route 
            path="/hr-docs" 
            element={
              <ProtectedRoute>
                <MakeDocsPage/>
              </ProtectedRoute>
            } 
          />
               <Route 
            path="/hr" 
            element={
              <ProtectedRoute>
                <HrPage/>
              </ProtectedRoute>
            } 
          />
               <Route 
            path="/hr-status" 
            element={
              <ProtectedRoute>
                <DocumentStatusPage/>
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/hr-head" 
            element={
              <ProtectedRoute>
                <HrApprovalPage/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
