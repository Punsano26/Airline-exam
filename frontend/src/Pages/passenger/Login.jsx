import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function PassengerLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/passenger/login', form, { withCredentials: true });
      navigate('/passenger/flights');
      window.location.reload(); // Refresh the page after navigation
    } catch {
      alert('เข้าสู่ระบบไม่สำเร็จ');
    }
};

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <form onSubmit={handleLogin} className="card bg-white p-8 shadow w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">เข้าสู่ระบบผู้โดยสาร</h2>
        <input name="email" placeholder="อีเมล" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input name="password" type="password" placeholder="รหัสผ่าน" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-full">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
