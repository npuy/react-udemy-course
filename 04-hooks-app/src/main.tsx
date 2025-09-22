import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "sonner";

// import { HooksApp } from "./HooksApp";
// import { TrafficLight } from "./01-useState/TrafficLight";
// import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
// import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
// import { PokemonPage } from "./03-example/PokemonPage";
// import { FocusScreen } from "./04-useRef/FocusScreen";
// import { TasksApp } from "./05-useReducer/TaskApp";
// import { ScrambleWords } from "./05-useReducer/ScrambleWords";
// import { MemoHook } from "./06-memos/MemoHooks";
// import { MemoCounter } from "./06-memos/MemoCounter";
// import { InstagromApp } from "./07-useOptimistic/InstagromApp";
// import { ClientInformation } from "./08-use-suspense/ClientInformation";
// import { getUserAction } from "./08-use-suspense/actions/getUser.action";
import { ProfessionalApp } from "./09-useContext/ProfessionalApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}

    {/* <Suspense
      fallback={
        <div className="bg-gradient flex flex-col gap-4">
          <h2 className="text-4xl font-thin text-white">Loading...</h2>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(1)} />
    </Suspense> */}

    <ProfessionalApp />
  </StrictMode>
);
