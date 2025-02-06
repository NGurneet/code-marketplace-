import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './page/homepage';
import Signup from './page/signuppage';
import LoginPage from './page/loginpage';
import AdminDashboardPage from './page/adminpage';
import UploadSongPage from './page/uploadSongPage';
import SongsPage from './page/songlistpage';
import PublicElements from './layouts/public';
import Basic from './layouts/Basic';
import AdminPrivateRoute from './components/AdminPrivateRoutes';
import UserPrivateRoute from './components/UserPrivateRoutes'; // Import UserPrivateRoute component
import UserDashboardPage from './page/user-dashboard-page';
import PlaylistComponent from './components/Playlist';
import CreatePlaylistPage from './components/CreatePlaylist';
import ForgotPassword from './page/forgotPassword';
import ResetPassword from './page/resetPasswordPage';
import UserProfile from './components/UserProfile';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorComponent from './components/ErrorComponent';
import { ToastContainer } from 'react-toastify';
import UploadFileForm from './page/fileUploadFormPage';
import ProjectsList from './page/projectListPage';
import ProjectDetail from './page/projectDetail';
import ApprovedProjects from './components/ApprovedProjects';
import WalletDisplay from './page/walletDisplay';
import ProjectsCardList from './page/projectCardList';
import ApprovedProjectsCardList from './page/approvedProjectCardList';
import PurchaseProjectDetail from './page/purhcaseProjectDetail';
import User from './layouts/User';
import WelcomePage from './page/welcomePage';


const App = () => {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/error" element={<ErrorComponent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Public Routes */}
        
          
          <Route path="/" element={<WelcomePage />} />
          
       

        {/* Admin Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route element={<Basic />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            
           
    
            <Route path="/profile" element={<UserProfile />} />
            <Route path='/projects' element={<ProjectsList />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/approved-projects" element={<ApprovedProjects />} />
            <Route path="/display-wallet" element={<WalletDisplay />} />
            <Route path='/project-cards' element={<ProjectsCardList />} />
            <Route path='/approved-project-cards' element={<ApprovedProjectsCardList />} />
            
           
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<UserPrivateRoute />}>
          <Route element={<User />}>
            {/* You can define other user-related routes here */}
            <Route path="/user-dashboard" element={<UserDashboardPage />} /> {/* Add your user dashboard */}
            <Route path="/upload-file" element={<UploadFileForm />} /> 
            <Route path="/projects-for-sale" element={<ApprovedProjects />} />
            <Route path="/wallet" element={<WalletDisplay />} />
            <Route path = "/purchase-project/:id" element={<PurchaseProjectDetail />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/buy" element={<UserDashboardPage />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
    <ToastContainer/>
    </ErrorBoundary>
  );
};

export default App;
