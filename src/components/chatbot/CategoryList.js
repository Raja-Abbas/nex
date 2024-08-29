import React from "react";
import CommentIcon from "../../assets/svgs/commentIcon.svg";
import Trash from "../../assets/svgs/trash.svg";

const CategoryList = ({
  categories,
  handleCategoryClick,
  handleDeleteCategory,
  input,
  setInput,
  handleKeyDown,
}) => {
  return (
    <div className="flex flex-col items-start gap-[30px]">
      <input
        type="text"
        placeholder="Search or start new chat"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="py-[12px] text-white pl-[15px] font-normal border-2 border-[#333636] rounded-[7px] text-tiny w-full outline-none focus:outline-none placeholder:text-description-color bg-[#1b1c1c]"
      />
      <div className="flex flex-col gap-[30px] max-h-[300px] w-full overflow-y-auto">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex justify-between items-center"
            onClick={() => handleCategoryClick(category.name)}
          >
            <button className="p-1 w-full text-left">
              <span className="text-white text-opacity-40 text-base">
                {category.name}
              </span>
              {category.messages.map((msg, index) => (
                <div
                  key={index}
                  className="flex justify-between mt-[11px] pr-2"
                >
                  <div className="flex gap-[9.5px]">
                    <img src={CommentIcon} alt="Comment Icon" />
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-[10px] items-start">
                        <p className="text-white text-lg">Greeting Liz</p>
                        <p className="text-white text-opacity-40 text-base">
                          {msg.time}
                        </p>
                      </div>
                      <p className="text-white text-opacity-70 text-base">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                  <img
                    src={Trash}
                    alt="Trash"
                    className="hover:opacity-50 transition-all cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                  />
                </div>
              ))}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
