import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { GrAdd } from "react-icons/gr";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";

interface Trigger {
  id: string;
  name: string;
  image: string;
  webhookUrl?: string;
}

interface Action {
  id: string;
  name: string;
  image: string;
  metadata?: {
    to: string;
    body: string;
  };
}

const ZapCell = () => {
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger | null>(null);
  const [selectedActions, setSelectedActions] = useState<Action[]>([{ id: "", name: "", image: "", metadata: { to: "", body: "" } }]);
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
            <div className="text-sm text-gray-500 mt-2 mx-auto">
              {selectedTrigger ? `${selectedTrigger.name} - ${selectedTrigger.webhookUrl}` : "1. Select the event that starts your Zap"}
            </div>
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
                <div className="text-sm text-gray-500 mt-2">
                  {ac.metadata?.to === "" ? `${ind + 2}. Select the event for your Zap to run` : `Send ${ac.name} - ${ac.metadata?.to}`}
                </div>
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
                    setSelectedActions([...selectedActions, { id: "", name: "", image: "", metadata: { to: "", body: "" } }]);
                  }}
                />
              </div>
            </div>
          ))}
          <div className="w-[100%] flex justify-end">
            <button
              className="border rounded-full mx-20 my-4 px-20 py-2 text-white bg-[#ff4f00]"
              onClick={async () => {
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/zap`,
                  {
                    availableTriggerId: selectedTrigger?.id,
                    triggerMetadata: {},
                    actions: selectedActions.map((action) => ({
                      availableActionId: action.id,
                      actionMetadata: action.metadata,
                    })),
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                console.log(res);
              }}
            >
              Publish
            </button>
          </div>
        </div>
      ) : (
        <Modal
          index={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSelectedTrigger={setSelectedTrigger}
          setSelectedActions={setSelectedActions}
        />
      )}
    </div>
  );
};

const Modal = ({
  index,
  setSelectedIndex,
  setSelectedTrigger,
  setSelectedActions,
}: {
  index: number | null;
  setSelectedIndex: (selectedIndex: number | null) => void;
  setSelectedTrigger: (selectedTrigger: Trigger | null) => void;
  setSelectedActions: (selectedActions: Action[]) => void;
}) => {
  const [availableTriggers, setAvailableTriggers] = useState<{ id: string; name: string; image: string }[]>([]);
  const [availableActions, setAvailableActions] = useState<{ id: string; name: string; image: string }[]>([]);
  const [infoBox, setInfoBox] = useState(false);
  const [currentAction, setCurrentAciton] = useState<string | null>(null);

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
                if (index !== 1 && index != null) {
                  setCurrentAciton(ty.name);
                  setSelectedActions((selectedActions) => {
                    const newAction: Action[] = [...selectedActions];
                    newAction[index - 2] = {
                      id: ty.id,
                      name: ty.name,
                      image: ty.image,
                    };
                    return newAction;
                  });
                  setInfoBox(!infoBox);
                } else {
                  console.log(uuidv4());
                  const uniqueId = uuidv4();
                  const webhook = `http://localhost:5173/webhook/${uniqueId}`;
                  setSelectedTrigger({ ...ty, webhookUrl: webhook });
                  setSelectedIndex(null);
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
        <div>
          {currentAction === "Solana" ? (
            <SolanaDetails setSelectedIndex={setSelectedIndex} setInfoBox={setInfoBox} setSelectedActions={setSelectedActions} index={index} />
          ) : (
            <EmailDetails setSelectedIndex={setSelectedIndex} setInfoBox={setInfoBox} setSelectedActions={setSelectedActions} index={index} />
          )}
        </div>
      )}
    </div>
  );
};

const SolanaDetails = ({
  index,
  setSelectedIndex,
  setInfoBox,
  setSelectedActions,
}: {
  index: number | null;
  setSelectedIndex: (selectedIndex: null | number) => void;
  setInfoBox: (infoBox: boolean) => void;
  setSelectedActions: (selectedActions: Action[]) => void;
}) => {
  const [to, setTo] = useState<string>("");
  const [body, setBody] = useState<string>("");

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
      <input type="text" className="border border-black rounded-lg w-[450px] px-2 py-2" value={to} onChange={(e) => setTo(e.target.value)} />
      <div className="px-2 py-1 font-semibold text-lg">Body</div>
      <input type="text" className="border border-black rounded-lg w-[450px] px-2 py-2" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="w-[100%] flex mt-5 mb-2">
        <button
          className="mx-auto rounded-full px-20 py-2 bg-[#ff4f00] text-white"
          onClick={() => {
            if (index) {
              setSelectedActions((a) => {
                const newAction: Action[] = [...a];
                newAction[index - 2] = {
                  id: a[index - 2].id,
                  name: a[index - 2].name,
                  image: a[index - 2].image,
                  metadata: {
                    to: to,
                    body: body,
                  },
                };

                return newAction;
              });
            }

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

const EmailDetails = ({
  index,
  setSelectedIndex,
  setInfoBox,
  setSelectedActions,
}: {
  index: number | null;
  setSelectedIndex: (selectedIndex: null | number) => void;
  setInfoBox: (infoBox: boolean) => void;
  setSelectedActions: (selectedActions: Action[]) => void;
}) => {
  const [to, setTo] = useState<string>("");
  const [body, setBody] = useState<string>("");

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
      <input type="text" className="border border-black rounded-lg w-[450px] px-2 py-2" value={to} onChange={(e) => setTo(e.target.value)} />
      <div className="px-2 py-1 font-semibold text-lg">Body</div>
      <input type="text" className="border border-black rounded-lg w-[450px] px-2 py-2" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="w-[100%] flex mt-5 mb-2">
        <button
          className="mx-auto rounded-full px-20 py-2 bg-[#ff4f00] text-white"
          onClick={() => {
            if (index) {
              setSelectedActions((a) => {
                const newAction: Action[] = [...a];
                newAction[index - 2] = {
                  id: a[index - 2].id,
                  name: a[index - 2].name,
                  image: a[index - 2].image,
                  metadata: {
                    to: to,
                    body: body,
                  },
                };

                return newAction;
              });
            }

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

      <div className="w-[100%] flex justify-center h-full min-h-screen">
        <div className="flex flex-col justify-center">
          <ZapCell />
        </div>
      </div>
    </div>
  );
};

export default ZapCreate;
