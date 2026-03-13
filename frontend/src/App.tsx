import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'about', Component: About },
      { path: 'testimonials', Component: Testimonials },
      { path: 'faq', Component: FAQ },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
