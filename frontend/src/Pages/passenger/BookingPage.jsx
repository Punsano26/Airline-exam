import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

export default function BookingPage() {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/flights`)
      .then(res => {
        const selected = res.data.find(f => f._id === flightId);
        if (!selected) throw new Error('ไม่พบเที่ยวบิน');
        setFlight(selected);
      })
      .catch(() => alert('เกิดข้อผิดพลาด'));
  }, [flightId]);

  const handleConfirmBooking = async () => {
    try {
      await axios.post(`http://localhost:5000/api/tickets/${flightId}`, {}, { withCredentials: true });
      alert('จองเที่ยวบินสำเร็จ!');
      navigate('/my-tickets');
    } catch (err) {
      alert(err.response?.data?.error || 'เกิดข้อผิดพลาดในการจอง');
    }
  };

  if (!flight) return <div className="text-center mt-10">กำลังโหลดข้อมูลเที่ยวบิน...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 card bg-base-100 shadow">
      <h2 className="text-2xl font-bold mb-4">ยืนยันการจองเที่ยวบิน</h2>
      <p><strong>ชื่อเที่ยวบิน:</strong> {flight.name}</p>
      <p><strong>จาก:</strong> {flight.origin}</p>
      <p><strong>ปลายทาง:</strong> {flight.destination}</p>
      <p><strong>ออกเดินทาง:</strong> {flight.departureTime}</p>
      <p><strong>ถึงที่หมาย:</strong> {flight.arrivalTime}</p>
      <p><strong>ที่นั่งว่าง:</strong> {flight.availableSeats}</p>
      <p><strong>ราคา:</strong> {flight.price.toLocaleString()} บาท</p>

      <button className="btn btn-primary w-full mt-6" onClick={handleConfirmBooking}>
        ✅ ยืนยันการจองเที่ยวบินนี้
      </button>
    </div>
  );
}
