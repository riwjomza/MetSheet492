import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
type Props = {
  onChange: any;
  onSubmit: any;
};

const InputSearch = ({ onChange, onSubmit }: Props) => {
  const [value, setValue] = useState("");
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      const parseValue = parseInt(value);
      console.log(parseValue)
      onSubmit(parseValue);
    }
  };
  return (
    <div className="border rounded-lg border-purple-light flex h-8 gap-3 overflow-hidden">
      <div
        className="bg-purple-light text-white rounded-md px-2 flex items-center justify-center cursor-pointer"
        onClick={() => onSubmit(value)}
      >
        <FiSearch size={20} />
      </div>
      <input
        type="text"
        placeholder="Search HN"
        onChange={(e: any) => setValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  );
};

export default InputSearch;
