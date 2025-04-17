import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PassengerProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/passenger/profile', { withCredentials: true })
      .then(res => {
        setUser(res.data);
        setForm(res.data);
      })
      .catch(() => alert('กรุณาเข้าสู่ระบบ'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/passenger/profile', form, { withCredentials: true });
      alert('บันทึกข้อมูลแล้ว');
    } catch {
      alert('เกิดข้อผิดพลาด');
    }
  };

  if (!user) return <div className="text-center mt-10">กำลังโหลดโปรไฟล์...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">โปรไฟล์ผู้โดยสาร</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input name="fullNameTH" className="input input-bordered w-full" placeholder="ชื่อ-นามสกุล (ไทย)" value={form.fullNameTH} onChange={handleChange} />
        <input name="fullNameEN" className="input input-bordered w-full" placeholder="ชื่อ-นามสกุล (อังกฤษ)" value={form.fullNameEN} onChange={handleChange} />
        <input name="email" className="input input-bordered w-full" placeholder="อีเมล" value={form.email} onChange={handleChange} />
        <input name="phone" className="input input-bordered w-full" placeholder="เบอร์โทร" value={form.phone} onChange={handleChange} />
        <input name="password" type="password" className="input input-bordered w-full" placeholder="รหัสผ่านใหม่ (ไม่ใส่ถ้าไม่เปลี่ยน)" onChange={handleChange} />
        <button className="btn btn-primary w-full">บันทึก</button>
      </form>
    </div>
  );
}
