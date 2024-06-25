import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background py-[21.5px] border-t border-line-color z-[100]">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-2">
        <p className="font-normal text-base text-description-color">NexLayer - Launch, Scale, and Conquer with AI</p>
        <div className="flex gap-4 md:place-self-center md:justify-self-end">
          <a href="/">
            <p className="font-normal text-base text-description-color cursor-pointer">Privacy Policy.</p>
          </a>
          <a href="/">
            <p className="font-normal text-base text-description-color cursor-pointer">Terms of Use.</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
