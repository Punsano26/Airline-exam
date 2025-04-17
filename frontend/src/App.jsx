import { BrowserRouter, Routes, Route } from 'react-router';
import FlightDashboard from './Pages/admin/FlightDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/flights" element={<FlightDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
