import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Kingdoms } from './pages/Kingdoms';
import { KingdomDetail } from './pages/KingdomDetail';
import { World } from './pages/World';
import { Gallery } from './pages/Gallery';
import { Handbook } from './pages/Handbook';
import { NotFound } from './pages/NotFound';
import { Events } from './pages/Events';
import { Particles } from './components/ui/Particles';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Application } from './pages/Application';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if we've already shown the loading screen this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    return !hasLoaded;
  });

  const handleLoadingFinish = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      </AnimatePresence>
      
      {!isLoading && <Particles />}
      {!isLoading && <ScrollToTop />}
      {!isLoading && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kingdoms" element={<Kingdoms />} />
          <Route path="/kingdoms/:id" element={<KingdomDetail />} />
          <Route path="/world" element={<World />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/handbook" element={<Handbook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/application" element={<Application />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute requiredPermission="viewAdminPanel" />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isLoading && <Footer />}
    </div>
  );
}

export default App;
