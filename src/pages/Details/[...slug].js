import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "../../assets/svgs/star-icon.svg";
import Cube from "../../assets/svgs/blueCube.svg";
import Calendar from "../../assets/svgs/calendar.svg";
import Download from "../../assets/svgs/download.svg";
import CheckMark from "../../assets/svgs/check-mark.svg";
import DocumentFolder from "../../assets/svgs/folder.svg";
import FourSquares from "../../assets/svgs/four-squares.svg";
import StepComponent from "../../components/aceternityComponents/StepComponent";
import ProjectXBox from "../../assets/svgs/projectXBox.svg";
import Nodejs from "../../assets/svgs/nodejsTemplate.svg";
import {
  GlowingStarsBackgroundCard, 
  GlowingStarsDescription,
} from "../../components/ui/glowing-stars";
import mdxMapping from "../../content/mdxMapping";
import { templatesData } from "../../constants/Framework";

export default function DynamicPage({ selectedCard }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [Content, setContent] = useState(null);
  useEffect(() => {
    if (slug !== slug.toLowerCase()) {
      navigate(`/details/${slug.toLowerCase()}`);
    }
  }, [slug, navigate]);

  useEffect(() => {
    const importContent = async () => {
      if (mdxMapping[slug.toLowerCase()]) {
        const { default: MDXContent } = await mdxMapping[slug.toLowerCase()]();
        setContent(() => MDXContent);
      } else {
        setContent(() => null);
      }
    };
    importContent();
  }, [slug]);

  const item = templatesData.find((item) => item.slug === slug.toLowerCase());

  if (!item) {
    return <div>Item not found</div>;
  }

  const SubTitle =
    "The all-in-one app for private document chat, AI Agents, and more.";
  const Note =
    "Due to Railway container permissions, web scraping of any sort is disabled! You will need to upload those site's HTML manually.";

    const step4 = {
      id: 1,
    type: "step",
    heading: "Deploy",
    description: "Deployment Successful",
    builder: "",
    image: "DeployLoadingState",
    details: [
      { label: "Project Name", value:slug, text: "white" },
      { label: "", value: `${item.title.toLowerCase()}-template-patch-1`, image: Nodejs, text: "white" },
      { label: "", value: "10 seconds ago" },
      { label: "", value: "ProjextX Builder", image: ProjectXBox },
    ],
  };

  return (
    <div className="text-white pt-10 min-h-[80vh] lg:max-w-[950px] max-xl:px-10 max-md:px-4 xl:max-w-[1200px] w-full flex max-xl:flex-col md:gap-5">
      <div className="flex flex-col gap-10">
        <a href="/marketplace" className="flex gap-3 text-description-color">
          <img src={FourSquares} alt="FourSquares" className="w-5" />
          <span>All Templates/{item.Marketplacecategory}</span>
        </a>
        <div className="flex gap-6 items-center">
          <img src={item.logo} alt={item.title} className="w-14 rounded-lg" />
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-semibold">{item.title}</p>
            <p className="text-lg font-semibold text-description-color">
              {SubTitle}
            </p>
          </div>
        </div>
        <div className="xl:flex gap-2 relative">
          <GlowingStarsBackgroundCard>
            <div className="flex flex-col justify-between items-end">
              <GlowingStarsDescription>
                <div
                  className={`z-10 absolute left-[15px] top-0 bottom-20 border border-custom-color animate-fill transition-all duration-[500ms]`}
                ></div>
                <StepComponent
                  step={step4}
                  index={1}
                  toggleBuildPageDetails={() => {}}
                />
                {isVisible && (
                  <div className="bg-[#203133] p-2 pl-3 pt-3 mt-[-55px] ml-11 rounded-b-md flex gap-2 items-center shadow-2xl">
                    <img src={item.logo} alt={item.logo} className="w-4 h-4" />
                    <p className="text-tiny font-semibold text-dark-blue">
                      {item.title}
                    </p>
                  </div>
                )}
              </GlowingStarsDescription>
            </div>
          </GlowingStarsBackgroundCard>
          <div className="-mt-20 relative float-right max-xl:hidden">
            <button className="bg-[#1EB8CD] hover:bg-opacity-70 transition-all px-[100px] py-2 rounded-md text-nowrap md:ml-10">
              Deploy Now
            </button>
            <div className="mt-12 md:ml-4 border-t border-t-[#374151] border-opacity-50">
              <div className="text-description-color mt-6 md:ml-8 flex flex-col gap-5">
                <div className="flex gap-5">
                  <img src={Calendar} alt="Calendar" className="w-4" />
                  <span>Created on Feb 21, 2024</span>
                </div>
                <div className="flex gap-5">
                  <img src={Download} alt="Download" className="w-4" />
                  <span>{item.Downloads} total projects</span>
                </div>
                <div className="flex gap-5 text-green">
                  <img src={CheckMark} alt="CheckMark" className="w-4" />
                  <span>100% success on recent deploys</span>
                </div>
                <div className="flex gap-5">
                  <img
                    src={DocumentFolder}
                    alt="DocumentFolder"
                    className="w-5"
                  />
                  <span>{item.Marketplacecategory}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Content && <Content />}
      </div>
    </div>
    // <div className="mb-10 max-xl:block xl:hidden">
    //   <button className="bg-[#1EB8CD] hover:bg-opacity-70 transition-all px-[100px] py-2 rounded-md text-nowrap md:ml-10">Deploy Now</button>
    //   <div className="mt-12 md:ml-4 border-t border-t-[#374151] border-opacity-50">
    //   <div className="text-description-color mt-6 md:ml-8 flex flex-col gap-5 mb-20">
    //     <div className="flex gap-5"><img src={Calendar} alt="Calendar" className="w-4" /><span>Created on Feb 21, 2024</span></div>
    //     <div className="flex gap-5"><img src={Download} alt="Download" className="w-4" /><span>440 total projects</span></div>
    //     <div className="flex gap-5 text-green"><img src={CheckMark} alt="CheckMark" className="w-4" /><span>100% success on reacent deploys</span></div>
    //     <div className="flex gap-5"><img src={DocumentFolder} alt="DocumentFolder" className="w-5" /><span>AI/ML</span></div>
    //   </div>
    //   </div>
    //   </div>
  // </div>
  );
}
