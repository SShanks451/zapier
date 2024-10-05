import { useState } from "react";
import Appbar from "../components/Appbar";
import { GrAdd } from "react-icons/gr";

const ZapCell = () => {
  const [actions, setActions] = useState(["xyz"]);

  return (
    <div className="">
      <div className="border-2 border-dotted rounded-xl border-black text-xl py-3 px-16 cursor-pointer my-1 mt-20">
        <div className="border border-black rounded-md w-fit mx-auto text-base py-1 font-semibold px-5 bg-slate-200">Trigger</div>
        <div className="text-sm text-gray-500 mt-2">1. Select the event that starts your Zap</div>
      </div>

      <div className="flex justify-center">
        <div className="border w-0 h-5 border-[#ff4f00]"></div>
      </div>

      <div className="flex justify-center">
        <GrAdd className="my-1" size={20} color="#ff4f00" />
      </div>

      {actions.map((ac, ind) => (
        <div className="">
          <div className="flex justify-center">
            <div className="border w-0 h-5 border-[#ff4f00]"></div>
          </div>

          <div className="border-2 border-dotted rounded-xl border-black text-xl py-3 px-16 cursor-pointer my-1">
            <div className="border border-black rounded-md w-fit mx-auto text-base py-1 font-semibold px-5 bg-slate-200">Action</div>
            <div className="text-sm text-gray-500 mt-2">{ind + 2}. Select the event for your Zap to run</div>
          </div>

          <div className="flex justify-center">
            <div className="border w-0 h-5 border-[#ff4f00]"></div>
          </div>
          <div className="flex justify-center">
            <GrAdd
              className="my-1 cursor-pointer"
              size={20}
              color="#ff4f00"
              onClick={() => {
                setActions([...actions, "xyz"]);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ZapCreate = () => {
  return (
    <div className="">
      <Appbar />
      <div className="w-[100%] flex justify-center h-full min-h-screen">
        <div className="flex flex-col justify-center">
          {" "}
          <ZapCell />
        </div>
      </div>
    </div>
  );
};

export default ZapCreate;
