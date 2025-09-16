import { useRef } from "react";

export const FocusScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Focus screen</h1>

      <input
        ref={inputRef}
        type="text"
        className="bg-black text-white px-4 py-2 rounded-md"
        autoFocus
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        Set focus
      </button>
    </div>
  );
};
