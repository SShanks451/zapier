import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { GrAdd } from "react-icons/gr";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const ZapCell = () => {
  // const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState([""]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div>
      {!selectedIndex ? (
        <div className="">
          <div
            className="border-2 border-dotted rounded-xl border-black text-xl py-3 px-16 cursor-pointer my-1 mt-20"
            onClick={() => {
              setSelectedIndex(1);
            }}
          >
            <div className="border border-black rounded-md w-fit mx-auto text-base py-1 font-semibold px-5 bg-slate-200">Trigger</div>
            <div className="text-sm text-gray-500 mt-2">1. Select the event that starts your Zap</div>
          </div>

          <div className="flex justify-center">
            <div className="border w-0 h-5 border-[#ff4f00]"></div>
          </div>

          <div className="flex justify-center">
            <GrAdd className="my-1" size={20} color="#ff4f00" />
          </div>

          {selectedActions.map((ac, ind) => (
            <div className="">
              <div className="flex justify-center">
                <div className="border w-0 h-5 border-[#ff4f00]"></div>
              </div>

              <div
                className="border-2 border-dotted rounded-xl border-black text-xl py-3 px-16 cursor-pointer my-1"
                onClick={() => setSelectedIndex(ind + 2)}
              >
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
                    setSelectedActions([...selectedActions, ""]);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Modal index={selectedIndex} setSelectedIndex={setSelectedIndex} />
      )}
    </div>
  );
};

const Modal = ({ index, setSelectedIndex }: { index: number | null; setSelectedIndex: (selectedIndex: number | null) => void }) => {
  const [availableTriggers, setAvailableTriggers] = useState<{ id: string; name: string; image: string }[]>([]);
  const [availableActions, setAvailableActions] = useState<{ id: string; name: string; image: string }[]>([]);
  const [infoBox, setInfoBox] = useState(false);

  useEffect(() => {
    async function getAvailableTriggersAndActions() {
      const res1 = await axios.get(`${BACKEND_URL}/api/v1/trigger/available`);
      setAvailableTriggers(res1.data.availabeTriggers);

      const res2 = await axios.get(`${BACKEND_URL}/api/v1/action/available`);
      setAvailableActions(res2.data.availableActions);
    }

    getAvailableTriggersAndActions();
  }, []);

  const availableType = index === 1 ? availableTriggers : availableActions;

  return (
    <div className="">
      {!infoBox ? (
        <div className="border-2 border-black shadow-lg rounded-lg mx-auto">
          <div className="flex justify-between px-5 py-3 border-b ">
            <div className="text-xl">Select {index === 1 ? "Trigger" : "Action"}</div>
            <RxCross2
              size={20}
              className="cursor-pointer my-auto"
              onClick={() => {
                setSelectedIndex(null);
                return <ZapCell />;
              }}
            />
          </div>
          {availableType.map((ty) => (
            <div
              className="flex pl-5 py-2 border-b pr-[300px] cursor-pointer hover:bg-slate-200"
              onClick={() => {
                if (index !== 1) {
                  setInfoBox(!infoBox);
                }
              }}
            >
              <div className="w-[30px]">
                <img className="" src={ty.image} alt="image" />
              </div>
              <div className="my-auto text-xl font-semibold ml-5">{ty.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <SolanaDetails setSelectedIndex={setSelectedIndex} setInfoBox={setInfoBox} />
      )}
    </div>
  );
};

const SolanaDetails = ({
  setSelectedIndex,
  setInfoBox,
}: {
  setSelectedIndex: (selectedIndex: null | number) => void;
  setInfoBox: (infoBox: boolean) => void;
}) => {
  return (
    <div className="border-2 border-black rounded-lg py-2 px-3 w-[500px]">
      <div className="flex justify-between border-b py-3 mx-2">
        <div className="text-lg">Enter Details</div>
        <RxCross2
          size={20}
          className="my-auto cursor-pointer"
          onClick={() => {
            setInfoBox(false);
          }}
        />
      </div>
      <div className="px-2 py-1 font-semibold text-lg">To</div>
      <input type="text" className="border border-black rounded-lg w-[450px] px-2 py-2" />
      <div className="px-2 py-1 font-semibold text-lg">Body</div>
      <input type="text" className="border border-black rounded-lg w-[450px] px-2 py-2" />
      <div className="w-[100%] flex mt-5 mb-2">
        <button
          className="mx-auto rounded-full px-20 py-2 bg-[#ff4f00] text-white"
          onClick={() => {
            setSelectedIndex(null);
            setInfoBox(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const ZapCreate = () => {
  return (
    <div className="">
      <Appbar />
      <div className="w-[100%] flex justify-end">
        <button className="border rounded-full mx-20 my-4 px-20 py-2 text-white bg-[#ff4f00]">Publish</button>
      </div>
      <div className="w-[100%] flex justify-center h-full min-h-screen">
        <div className="flex flex-col justify-center">
          <ZapCell />
        </div>
      </div>
    </div>
  );
};

export default ZapCreate;
