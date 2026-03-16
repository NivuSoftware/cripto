import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminShell } from './components/admin/AdminShell';
import { Layout } from './components/Layout';
import { AdminRoute } from './components/AdminRoute';
import { AdminAuthProvider } from './lib/adminAuth';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminBlogEditor from './pages/AdminBlogEditor';
import AdminBlogList from './pages/AdminBlogList';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  { path: '/acceso-admin', Component: AdminLogin },
  {
    Component: AdminRoute,
    children: [
      {
        path: 'admin',
        Component: AdminShell,
        children: [
          { index: true, element: <Navigate to="/admin/blog" replace /> },
          { path: 'blog', Component: AdminBlogList },
          { path: 'blog/:postId', Component: AdminBlogEditor },
        ],
      },
    ],
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'blog', Component: BlogIndex },
      { path: 'blog/:slug', Component: BlogPost },
      { path: 'services', Component: Services },
      { path: 'about', Component: About },
      { path: 'testimonials', Component: Testimonials },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);

export default function App() {
  return (
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  );
}
