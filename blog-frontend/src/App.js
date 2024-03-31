import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import './App.css';
import HomePage from './pages/home/HomePage';
import ArticlePage from './pages/ArticleDetails/ArticlePage'
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Admin from './pages/Admin/screen/Admin';
import Comments from './pages/Admin/screen/comments/Comments';
import AdminLayout from './pages/Admin/AdminLayout';
import NewPost from './pages/Admin/screen/posts/NewPost';
import ManagePost from './pages/Admin/screen/posts/ManagePost';

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />}/>
          <Route path="posts/new" element={<NewPost />}/>
          <Route path="posts/manage" element={<ManagePost />}/>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
