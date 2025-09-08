
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RevenueCyclePage from './pages/RevenueCycle';


function ProtectedRoute({ children }) {
   const { user, loading } = useAuth();
   const location = useLocation();
   if (loading) return null; // ou um spinner
   if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
   return children;
}

function PublicRoute({ children }) {
   const { user, loading } = useAuth();
   if (loading) return null; // ou um spinner
   if (user) return <Navigate to="/revenue-cycle" replace />;
   return children;
}

function AppRoutes() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={
               <PublicRoute>
                  <LoginPage />
               </PublicRoute>
            } />
            <Route path="/register" element={
               <PublicRoute>
                  <RegisterPage />
               </PublicRoute>
            } />
            <Route path="/revenue-cycle" element={
               <ProtectedRoute>
                  <RevenueCyclePage />
               </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/login" />} />
         </Routes>
      </BrowserRouter>
   );
}

export default function App() {
   return (
      <AuthProvider>
         <AppRoutes />
      </AuthProvider>
   );
}