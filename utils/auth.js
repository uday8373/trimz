import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Auth({children}) {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    } else {
      setToken(storedToken);
    }
  }, []);

  return token ? children : null;
}
