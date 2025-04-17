import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function PassengerRegister() {
  const [form, setForm] = useState({
    fullNameTH: '', fullNameEN: '', email: '', phone: '', password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/passenger/register', form);
      alert('สมัครสมาชิกสำเร็จ');
      navigate('/login');
    } catch {
      alert('เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="card bg-white p-8 shadow w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">สมัครสมาชิกผู้โดยสาร</h2>
        <input name="fullNameTH" placeholder="ชื่อ-นามสกุล (ไทย)" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, fullNameTH: e.target.value })} />
        <input name="fullNameEN" placeholder="ชื่อ-นามสกุล (อังกฤษ)" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, fullNameEN: e.target.value })} />
        <input name="email" placeholder="อีเมล" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input name="phone" placeholder="เบอร์โทร" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input name="password" type="password" placeholder="รหัสผ่าน" className="input input-bordered w-full" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-full">สมัครสมาชิก</button>
      </form>
    </div>
  );
}
