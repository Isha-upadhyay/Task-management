// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import RoleSelection from "./pages/RoleSelection";
// import AdminDashboard from "./pages/AdminDashboard";
// import UserDashboard from "./pages/UserDashboard";
// import Tasks from "./pages/Tasks";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// const PrivateRoute = ({ children, role }) => {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" />;
//   if (role && user.role !== role) return <Navigate to="/login" />;
//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/role" element={<RoleSelection />} />

//           <Route
//             path="/admin/dashboard"
//             element={
//               <PrivateRoute role="admin">
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/admin/tasks"
//             element={
//               <PrivateRoute role="admin">
//                 <Tasks />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/user/dashboard"
//             element={
//               <PrivateRoute role="user">
//                 <UserDashboard />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/user/tasks"
//             element={
//               <PrivateRoute role="user">
//                 <Tasks />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Tasks from "./pages/Tasks";
import { AuthProvider, useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ ROOT REDIRECT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/role" element={<RoleSelection />} />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tasks"
            element={
              <PrivateRoute role="admin">
                <Tasks />
              </PrivateRoute>
            }
          />

          {/* USER */}
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/tasks"
            element={
              <PrivateRoute role="user">
                <Tasks />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

