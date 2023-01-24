import { useDispatch } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Layout = () => {
  const { keycloak } = useKeycloak();

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<{
    id: string;
    name: string;
    phone: string;
  }>({
    id: "",
    name: "",
    phone: "",
  });
};
