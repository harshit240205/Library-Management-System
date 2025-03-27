
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LearnMore from "./pages/LearnMore";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminAccount from "./pages/admin/AdminAccount";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentBooks from "./pages/student/StudentBooks";
import StudentBorrows from "./pages/student/StudentBorrows";
import StudentAccount from "./pages/student/StudentAccount";
import PayFine from "./pages/student/PayFine";

const queryClient = new QueryClient();

// Route protection components
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const StudentRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user || user.role !== 'student') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/learn-more" element={<LearnMore />} />
    
    {/* Admin Routes */}
    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="/admin/books" element={<AdminRoute><AdminBooks /></AdminRoute>} />
    <Route path="/admin/account" element={<AdminRoute><AdminAccount /></AdminRoute>} />
    
    {/* Student Routes */}
    <Route path="/student" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
    <Route path="/student/books" element={<StudentRoute><StudentBooks /></StudentRoute>} />
    <Route path="/student/borrows" element={<StudentRoute><StudentBorrows /></StudentRoute>} />
    <Route path="/student/account" element={<StudentRoute><StudentAccount /></StudentRoute>} />
    <Route path="/student/pay-fine" element={<StudentRoute><PayFine /></StudentRoute>} />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
