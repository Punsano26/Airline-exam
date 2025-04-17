import { useAdminAuth } from '../../hooks/useAdminAuth';  // ปรับให้ตรงกับตำแหน่งไฟล์ของคุณ
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function FlightDashboard() {
  const loading = useAdminAuth();              // ✅ Hook 1
  const [flights, setFlights] = useState([]);  // ✅ Hook 2
  const [form, setForm] = useState({           // ✅ Hook 3
    name: '', origin: '', destination: '',
    departureTime: '', arrivalTime: '',
    availableSeats: '', price: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const res = await axios.get('http://localhost:5000/api/flights');
    setFlights(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/flights', form);
    setForm({ name: '', origin: '', destination: '', departureTime: '', arrivalTime: '', availableSeats: '', price: '' });
    fetchFlights();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/flights/${id}`);
    fetchFlights();
  };

  // แก้ไขที่นี่: เพิ่มการตรวจสอบหากยังโหลดข้อมูลอยู่
  if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">จัดการเที่ยวบิน</h1>

      <form className="grid grid-cols-2 gap-4 mb-8" onSubmit={handleSubmit}>
        <input type="text" placeholder="ชื่อเที่ยวบิน" name="name" className="input input-bordered" onChange={handleChange} value={form.name} required />
        <input type="text" placeholder="สนามบินต้นทาง" name="origin" className="input input-bordered" onChange={handleChange} value={form.origin} required />
        <input type="text" placeholder="สนามบินปลายทาง" name="destination" className="input input-bordered" onChange={handleChange} value={form.destination} required />
        <input type="text" placeholder="เวลาออกเดินทาง" name="departureTime" className="input input-bordered" onChange={handleChange} value={form.departureTime} required />
        <input type="text" placeholder="เวลาถึงที่หมาย" name="arrivalTime" className="input input-bordered" onChange={handleChange} value={form.arrivalTime} required />
        <input type="number" placeholder="จำนวนที่นั่งว่าง" name="availableSeats" className="input input-bordered" onChange={handleChange} value={form.availableSeats} required />
        <input type="number" placeholder="ราคาตั๋ว" name="price" className="input input-bordered" onChange={handleChange} value={form.price} required />
        <button type="submit" className="btn btn-primary col-span-2">เพิ่มเที่ยวบิน</button>
      </form>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>เที่ยวบิน</th>
              <th>ต้นทาง</th>
              <th>ปลายทาง</th>
              <th>เวลาออก</th>
              <th>ถึง</th>
              <th>ที่นั่ง</th>
              <th>ราคา</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.origin}</td>
                <td>{f.destination}</td>
                <td>{f.departureTime}</td>
                <td>{f.arrivalTime}</td>
                <td>{f.availableSeats}</td>
                <td>{f.price}</td>
                <td>
                  <button className="btn btn-error btn-sm" onClick={() => handleDelete(f._id)}>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
