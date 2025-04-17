import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets/my', { withCredentials: true })
      .then(res => setTickets(res.data))
      .catch(() => alert('กรุณาเข้าสู่ระบบเพื่อดูตั๋ว'));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ตั๋วโดยสารของฉัน</h2>
      {tickets.length === 0 ? (
        <p>ยังไม่มีตั๋ว</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map(ticket => (
            <div key={ticket._id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">รหัสตั๋ว: {ticket.ticketCode}</h2>
                <p>เที่ยวบิน: {ticket.flightId.name}</p>
                <p>จาก: {ticket.flightId.origin} → {ticket.flightId.destination}</p>
                <p>เวลาออก: {ticket.flightId.departureTime}</p>
                <p>เวลาถึง: {ticket.flightId.arrivalTime}</p>
                <p>ชื่อผู้โดยสาร: {ticket.passengerId.fullNameTH}</p>
                <p>เบอร์ที่นั่ง: {ticket.seatNumber}</p>
                <p>ราคาตั๋ว: {ticket.price.toLocaleString()} บาท</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
