import React from "react";
import Send from "../../assets/svgs/send.svg";

const InputArea = ({ input, setInput, handleSend, handleKeyDown }) => {
  return (
    <div className="mt-[30px] overflow-hidden border-2 border-[#333636] flex justify-between items-center bg-[#1b1c1c] rounded-[7px]">
      <input
        type="text"
        placeholder="How can I help you?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="py-[12px] text-white pl-[15px] font-normal text-tiny border-none w-full outline-none focus:border-none focus:outline-none placeholder:text-description-color bg-[#1b1c1c]"
      />
      <img
        className="pr-[15px] cursor-pointer"
        src={Send}
        alt="Send Icon"
        onClick={handleSend}
      />
    </div>
  );
};

export default InputArea;
