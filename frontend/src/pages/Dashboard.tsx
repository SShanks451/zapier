import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

const ZapTable = () => {
  const [zaps, setZaps] = useState([]);

  useEffect(() => {
    async function func() {
      const res = await axios.get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setZaps(res.data.zaps);
      console.log(res.data.zaps);
    }

    func();
  }, []);

  return (
    <table className="border-collapse w-[60%] table-fixed">
      <thead>
        <tr className="">
          <th className="border-2 w-[40%] py-1">Zap Id</th>
          <th className="border-2 w-[20%] py-1">Last Edit</th>
          <th className="border-2 w-[20%] py-1">Running</th>
          <th className="border-2 w-[20%] py-1">Go</th>
        </tr>
      </thead>
      <tbody>
        {zaps.map((z) => (
          <tr>
            <td className="border-2 w-[40%] text-center py-1">{z.id}</td>
            <td className="border-2 w-[20%] text-center py-1">Coming soon....</td>
            <td className="border-2 w-[20%] text-center py-1">Coming soon....</td>
            <td className="border-2 w-[20%] text-center py-1 cursor-pointer hover:bg-slate-300">Coming soon....</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[100%]">
      <Appbar />
      <div className="flex justify-end">
        <button className="mx-12 my-5 bg-purple-700 border text-white px-6 py-2 rounded-full" onClick={() => navigate("/zap/create")}>
          Create Zap
        </button>
      </div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-semibold my-4 text-purple-700">My Zaps</h1>
      </div>
      <div className="flex justify-center my-10 w-[100%]">
        <ZapTable />
      </div>
    </div>
  );
};

export default Dashboard;
