import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useAuth } from './FirebaseProvider';

interface AuthScreenProps {
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onBack }) => {
  const { signIn, signInWithEmail, signUpWithEmail, signInAsDemo } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDemoBypass, setShowDemoBypass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setShowDemoBypass(false);

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setIsLoading(false);
      
      // Handle missing firebase config error or incorrect credentials elegantly
      if (error.code === 'auth/operation-not-allowed' || error.message?.includes('operation-not-allowed')) {
        setErrorMsg("Email/Password auth is not enabled in Firebase Console. Please try Google Sign-In or continue in Demo Mode.");
        setShowDemoBypass(true);
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMsg("Invalid email or password. Please try again or continue in Demo Mode.");
        setShowDemoBypass(true);
      } else {
        setErrorMsg(error.message || "An authentication error occurred.");
        setShowDemoBypass(true);
      }
    }
  };

  const handleDemoBypass = () => {
    signInAsDemo(email || 'demo@example.com', name || undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Side: Illustration & Text */}
        <div className="md:w-1/2 bg-blue-50/50 p-12 flex flex-col justify-between border-r border-blue-100/50">
          <div className="flex-1 flex items-center justify-center">
             <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                <img 
                  src="/assets/images/regenerated_image_1779057677370.jpg" 
                  alt="Antima Compassionate Support" 
                  className="w-full h-full object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-display font-medium text-[#0F172A] leading-tight">
              Some journeys need <br />
              more than strength — <br />
              <span className="italic font-medium text-[#2563EB]">they need support</span>
            </h2>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-10 h-10">
                       <path d="M50 10 C30 40 45 70 50 90 C55 70 70 40 50 10Z" fill="#D4AF37" />
                       <circle cx="50" cy="90" r="8" fill="#8B4513" />
                    </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-[#8B4513] leading-none tracking-tight">अंतिमा</span>
                  <span className="text-[10px] font-bold text-[#8B4513]/40 uppercase tracking-[0.3em] leading-none mt-1">Antima</span>
                </div>
              </div>
              <h1 className="text-2xl font-display font-medium text-primary mb-2 tracking-tight">Sign Up / Login</h1>
              <div className="h-1.5 w-12 bg-primary rounded-full"></div>
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex flex-col gap-3 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <span className="font-semibold text-amber-800">Notice:</span> {errorMsg}
                  </div>
                </div>
                {showDemoBypass && (
                  <button
                    type="button"
                    onClick={handleDemoBypass}
                    className="w-full mt-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-md shadow-amber-600/10 text-xs text-center"
                  >
                    Proceed in Offline Demo Mode
                  </button>
                )}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Choose a handle"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600 transition-colors"
                  >
                    <Lock size={18} className="stroke-current" />
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                    />
                    <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 py-1">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-100" />
                <label htmlFor="terms" className="text-xs font-semibold text-slate-500">
                  I agree to the <span className="text-blue-600 hover:underline cursor-pointer">terms of service</span> and <span className="text-blue-600 hover:underline cursor-pointer">privacy statement</span>
                </label>
              </div>

              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2563EB] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-3 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Continue'
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-text-muted">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-1 text-primary font-bold hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-text-light bg-white px-4">
                Or continue with
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-center gap-6">
                <button 
                  type="button"
                  onClick={() => signIn()}
                  title="Sign in with Google"
                  className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                <button 
                  type="button"
                  title="Sign in with Facebook"
                  className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105"
                >
                  <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
              
              <button 
                type="button"
                onClick={() => signInAsDemo('guest@example.com', 'Guest Explorer')}
                className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-all uppercase tracking-widest mt-1 hover:underline cursor-pointer"
              >
                Explore as Guest (Demo Mode)
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
