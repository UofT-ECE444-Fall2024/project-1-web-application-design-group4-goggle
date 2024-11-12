import { useEffect } from 'react';
import api from "@/api/axiosInstance";
import { useRouter } from 'next/navigation';

const useTokenCheck = (setAuthenticated: (auth: boolean) => void) => {
    const router = useRouter();
   
    const verifyToken = async (token: string) => {
        try {
            const response = await api.get(`identity/auth`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Token verified", response.data);
            setAuthenticated(true);
        } catch (error) {
            console.error("Token verification failed", error);
            router.push("/signin");
        }
    };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      console.log("Token not found, redirecting to signin.");
      router.push("/signin");
    }
  }, [router, setAuthenticated]);
};

export default useTokenCheck;
