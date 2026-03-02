
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[calc(100vh-2rem)] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="size-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0,168,132,0.1)', border: '1px solid rgba(0,168,132,0.15)' }}>
                    <MessageCircleIcon className="w-7 h-7" style={{ color: '#00A884' }} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: '#E9EDEF' }}>Welcome Back</h2>
                  <p style={{ color: 'rgba(233,237,239,0.4)' }}>Login to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="input" placeholder="johndoe@gmail.com" />
                    </div>
                  </div>
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input type="password" value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} className="input" placeholder="Enter your password" />
                    </div>
                  </div>
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? <LoaderIcon className="w-full h-5 animate-spin text-center" /> : "Sign In"}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">Don't have an account? Sign Up</Link>
                </div>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, rgba(0,168,132,0.03), transparent)' }}>
              <div>
                <img src="/login.png" alt="People using mobile devices" className="w-full h-auto object-contain" />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium" style={{ color: '#00C897' }}>Connect anytime, anywhere</h3>
                  <div className="mt-4 flex justify-center gap-3">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;
