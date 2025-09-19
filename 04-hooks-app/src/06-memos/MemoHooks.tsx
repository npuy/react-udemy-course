import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubtitle } from "./ui/MySubtitle";

export const MemoHook = () => {
  const [title, setTitle] = useState("My title");
  const [subtitle, setSubtitle] = useState("My subtitle");

  const handleMyAPICall = useCallback(() => {
    console.log("API call..." + subtitle);
  }, [subtitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl origin-bottom-right">MemoApp</h1>

      <MyTitle title={title} />

      <MySubtitle subtitle={subtitle} callMyAPI={handleMyAPICall} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello, " + new Date().getTime())}
      >
        Change title
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubtitle("World")}
      >
        Change subtitle
      </button>
    </div>
  );
};
