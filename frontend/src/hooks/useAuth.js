import { useState } from "react";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";

import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  const history = useNavigate();

  async function register(user) {
    let messageText = "Cadastro realizado com sucesso";
    let messageType = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      messageText = error.response.data.msg;
      messageType = "error";
    }

    async function authUser(data) {
      setAuthenticated(true);
      localStorage.setItem("token", JSON.stringify(data.token));
      history("/");
    }

    setFlashMessage(messageText, messageType);
  }

  return { register };
}
