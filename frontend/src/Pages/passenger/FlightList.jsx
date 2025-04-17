import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(res => setFlights(res.data))
      .catch(console.error);

    // เช็คว่าเข้าสู่ระบบหรือยัง
    axios.get('http://localhost:5000/api/passenger/me', { withCredentials: true })
      .then(res => setIsLoggedIn(res.data.isAuth))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleBooking = (flightId) => {
    if (!isLoggedIn) {
      alert('กรุณาเข้าสู่ระบบก่อนจอง');
      navigate('/passenger/login');
      return;
    }
    navigate(`/booking/${flightId}`);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">เที่ยวบินที่เปิดให้จอง</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map(flight => (
          <div key={flight._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{flight.name}</h2>
              <p>จาก: {flight.origin}</p>
              <p>ถึง: {flight.destination}</p>
              <p>ออกเดินทาง: {flight.departureTime}</p>
              <p>ถึงที่หมาย: {flight.arrivalTime}</p>
              <p>ที่นั่งว่าง: {flight.availableSeats}</p>
              <p>ราคา: {flight.price.toLocaleString()} บาท</p>
              {isLoggedIn && (
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => handleBooking(flight._id)}>จองเที่ยวบินนี้</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
