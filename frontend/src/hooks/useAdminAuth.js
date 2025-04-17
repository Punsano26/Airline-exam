import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/me', { withCredentials: true })
      .then(res => {
        if (!res.data.isAuth) navigate('/admin/login');
        else setLoading(false);
      })
      .catch(() => navigate('/admin/login'));
  }, []);

  return loading;
};
