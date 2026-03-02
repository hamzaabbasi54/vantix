import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Chatpage from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { useAuthStore } from './store/useAuthStore.js'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden" style={{ background: '#111111' }}>
        <div className="size-10 border-3 rounded-full animate-spin" style={{ borderColor: 'rgba(0,168,132,0.2)', borderTopColor: '#00A884' }}></div>
      </div>
    );
  }

  return (
    <div className="h-screen relative flex items-center justify-center p-4 overflow-hidden" style={{ background: '#111111' }}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(26, 26, 26, 0.95)',
            color: '#E9EDEF',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-5%] size-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,168,132,0.06) 0%, transparent 70%)', animation: 'pulse-glow 8s ease-in-out infinite' }} />
      <div className="absolute bottom-[-10%] right-[-5%] size-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,200,151,0.04) 0%, transparent 70%)', animation: 'pulse-glow 10s ease-in-out infinite 2s' }} />

      <Routes>
        <Route path="/" element={authUser ? <Chatpage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}
export default App