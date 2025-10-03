import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import InstructorDashboard from './pages/InstructorDashboard.jsx';
import InstructorCourseNew from './pages/InstructorCourseNew.jsx';
import HomePage from './pages/HomePage.jsx';
import { ToastProvider } from './components/Toast.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';

function Layout({ children }) {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/instructor" element={<ProtectedRoute roles={["instructor", "admin"]}><InstructorDashboard /></ProtectedRoute>} />
            <Route path="/instructor/courses/new" element={<ProtectedRoute roles={["instructor", "admin"]}><InstructorCourseNew /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/me" element={<ProtectedRoute roles={["student", "admin"]}><StudentDashboard /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </ToastProvider>
    </AuthProvider>
  );
}


