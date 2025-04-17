import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/useAuth';

export default function Navbar() {
  const { isPassenger, isAdmin, setPassenger, setAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // เช็คสถานะผู้โดยสาร
    axios.get('http://localhost:5000/api/passenger/me', { withCredentials: true })
      .then(res => res.data.isAuth && setPassenger())
      .catch(() => {});

    // เช็คสถานะแอดมิน
    axios.get('http://localhost:5000/api/admin/me', { withCredentials: true })
      .then(res => res.data.isAuth && setAdmin())
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    if (isPassenger) await axios.post('http://localhost:5000/api/passenger/logout', {}, { withCredentials: true });
    if (isAdmin) await axios.post('http://localhost:5000/api/admin/logout', {}, { withCredentials: true });

    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-200 shadow mb-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">✈️ Nakhon Pathom Airline</Link>
      </div>
      <div className="flex-none gap-2">
        {isPassenger && (
          <>
            <Link to="/passenger/flights" className="btn btn-ghost">เที่ยวบิน</Link>
            <Link to="/my-tickets" className="btn btn-ghost">ตั๋วของฉัน</Link>
            <Link to="/passenger/profile" className="btn btn-ghost">โปรไฟล์</Link>
            <button onClick={handleLogout} className="btn btn-outline btn-error">ออกจากระบบ</button>
          </>
        )}

        {isAdmin && (
          <>
            <Link to="/admin/flights" className="btn btn-ghost">จัดการเที่ยวบิน</Link>
            <button onClick={handleLogout} className="btn btn-outline btn-error">ออกจากระบบ</button>
          </>
        )}

        {!isPassenger && !isAdmin && (
          <>
            <Link to="/login" className="btn btn-ghost">เข้าสู่ระบบ</Link>
            <Link to="/register" className="btn btn-primary">สมัครสมาชิก</Link>
          </>
        )}
      </div>
    </div>
  );
}
