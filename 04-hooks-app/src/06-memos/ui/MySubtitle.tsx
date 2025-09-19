import React from "react";

interface MySubtitleProps {
  subtitle: string;

  callMyAPI: () => void;
}

export const MySubtitle = React.memo(
  ({ subtitle, callMyAPI }: MySubtitleProps) => {
    console.log("MySubtitle re-render");

    return (
      <>
        <h6 className="text-2xl font-bold">{subtitle}</h6>
        <button
          className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
          onClick={callMyAPI}
        >
          Call to function
        </button>
      </>
    );
  }
);
