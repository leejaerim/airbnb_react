import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectPageProps {
  children: React.ReactNode;
}
export default function ProtectPage({ children }: IProtectPageProps) {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn]);
  return <>{children}</>;
}
