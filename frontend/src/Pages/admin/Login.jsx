import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/login', form, { withCredentials: true });
      navigate('/admin/flights');
    } catch {
      alert('เข้าสู่ระบบไม่สำเร็จ');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <form onSubmit={handleLogin} className="card bg-white shadow p-8 space-y-4 w-96">
        <h2 className="text-xl font-bold text-center">เข้าสู่ระบบแอดมิน</h2>
        <input type="text" name="username" placeholder="ชื่อผู้ใช้" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" name="password" placeholder="รหัสผ่าน" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-full">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
