import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const result = login(email, password);
    
    if (result.success) {
      toast.success('Welcome back, Admin!');
      navigate('/admin'); // Send them to the dashboard
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="font-serif text-2xl text-accent font-bold tracking-widest mb-1">VAULTEX</div>
          <div className="text-xs text-gray-500 tracking-[0.2em] uppercase">Admin Portal</div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vaultex.com" 
              className="w-full bg-surface2 border border-gray-800 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-surface2 border border-gray-800 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-colors" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent text-black rounded-lg py-3 text-sm font-bold tracking-wide hover:bg-accent/90 transition-colors mt-4"
          >
            Access Dashboard
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500">Demo Credentials:</p>
          <p className="text-xs text-gray-400 mt-1">Email: <span className="text-gray-300">admin@vaultex.com</span></p>
          <p className="text-xs text-gray-400">Password: <span className="text-gray-300">admin123</span></p>
        </div>
      </div>
    </div>
  );
}