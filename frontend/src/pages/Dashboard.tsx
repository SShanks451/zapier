import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";

const ZapTable = () => {
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
        <tr>
          <td className="border-2 w-[40%] text-center py-1">abc124efghtyjdgsakghfkagfukg</td>
          <td className="border-2 w-[20%] text-center py-1">1st Aug 2024</td>
          <td className="border-2 w-[20%] text-center py-1">Yes</td>
          <td className="border-2 w-[20%] text-center py-1 cursor-pointer hover:bg-slate-300">Go</td>
        </tr>
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
