import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border border-b-2">
      <div className="text-2xl font-bold py-3 mx-10">zapier</div>
      <div className="flex py-3 mx-10">
        <button className="mx-3 text-sm hover:border hover:bg-gray-200 px-2" onClick={() => navigate("/login")}>
          Log in
        </button>
        <button className="mx-3 border px-6 text-white text-sm rounded-full bg-[#ff4f00] hover:shadow-lg" onClick={() => navigate("/signup")}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Appbar;
