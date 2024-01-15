import axios from "axios";
import { useEffect, useState } from "react";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/users/getuser`,
        { headers }
      );
      setUser(response.data.user);
    };
    getUser();
  }, []);
  return (
    <div className="mt-[300px] text-white text-center text-3xl">
      {user.id} This Page Is Under Maintenance. Come Back Soon {user.name}
    </div>
  );
}
