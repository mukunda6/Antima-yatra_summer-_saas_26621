/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, MobileNav, EmergencyFAB, Footer } from './components/Layout';
import { HomeScreen } from './components/HomeScreen';
import { RitualScreen } from './components/RitualScreen';
import { CommunicateScreen } from './components/CommunicateScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { EventsScreen } from './components/EventsScreen';
import { FinancialScreen } from './components/FinancialScreen';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { GriefScreen } from './components/GriefScreen';
import { AccountScreen } from './components/AccountScreen';
import { HospitalScreen } from './components/hospital/HospitalScreen';
import { useAuth } from './components/FirebaseProvider';

export default function App() {
  const { user, loading, logout } = useAuth();
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, hasStarted, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hasStarted && !user) {
    return (
      <LandingPage 
        onStart={() => {
          setHasStarted(true);
        }} 
      />
    );
  }

  if (!user) {
    return (
      <AuthScreen 
        onBack={() => setHasStarted(false)}
      />
    );
  }

  const handleLogout = async () => {
    await logout();
    setHasStarted(false);
    setActiveTab('home');
  };

  const navUser = {
    name: user.displayName || 'User',
    email: user.email || ''
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={navUser} />
      
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {activeTab === 'home' && <HomeScreen setScreen={setActiveTab} />}
              {activeTab === 'ritual' && <RitualScreen />}
              {activeTab === 'hospital' && <HospitalScreen />}
              {activeTab === 'communicate' && <CommunicateScreen onNavigate={setActiveTab} />}
              {activeTab === 'marketplace' && <MarketplaceScreen />}
              {activeTab === 'events' && <EventsScreen />}
              {activeTab === 'financial' && <FinancialScreen />}
              {activeTab === 'grief' && <GriefScreen />}
              {activeTab === 'account' && <AccountScreen user={navUser} onLogout={handleLogout} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      
      <EmergencyFAB onNavigate={setActiveTab} />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
