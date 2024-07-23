import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { templatesData } from "../../constants/Framework";
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
const fetchMDXContent = async (slug) => {
  try {
    const content = await import(`../../content/${slug}.mdx`);
    return content.default;
  } catch (error) {
    throw new Error(`Could not fetch MDX file: ${slug}`);
  }
};

const DetailsPage = () => {
  const { slug } = useParams();
  const [Content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const mdxContent = await fetchMDXContent(slug);
        setContent(() => mdxContent);
      } catch (error) {
        console.error(error);
        navigate("/404")
      }
    };
    loadContent();
  }, [slug]);
  useEffect(() => {
    if (slug !== slug.toLowerCase()) {
      navigate(`/details/${slug.toLowerCase()}`);
    }
  }, [slug, navigate]);

  if (!Content) return <div>Loading...</div>;
  const item = templatesData.find((item) => item.slug === slug.toLowerCase());

  const SubTitle =
  "The all-in-one app for private document chat, AI Agents, and more.";
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
    <div className="text-white pt-10 min-h-[80vh] lg:max-w-[950px] max-xl:px-10 max-md:px-4 xl:max-w-[1200px] 2xl:max-w-[1440px] w-full flex max-xl:flex-col md:gap-5">
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
                toggleBuildPageDetails={() => { } }
                disableLoading={true} />
              <div className="bg-[#203133] p-2 pl-3 pt-3 mt-[-55px] ml-11 rounded-b-md flex gap-2 items-center shadow-2xl">
                <img src={item.logo} alt={item.logo} className="w-4 h-4" />
                <p className="text-tiny font-semibold text-dark-blue">
                  {item.title}
                </p>
              </div>
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
                  className="w-5" />
                <span>{item.Marketplacecategory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MDXProvider>
        <div className="prose pt-20 pb-20 prose-img:w-4 prose-code:text-white prose-lg prose-h1:text-3xl prose-h2:text-[24px] prose-h2:text-white prose-h1:text-white prose-em:text-[#89888d] prose-em:text-lg prose-em:font-bold prose-strong:text-[#89888d] prose-strong:ml-1 prose-strong:font-semibold prose-a:text-white prose-li:marker:text-[#89888d] prose-li:font-bold prose-img:my-0 prose-img:mr-1 prose-ul:text-[#89888D] prose-blockquote:text-[#fff] prose-blockquote:text-opacity-70 prose-blockquote:border-l-5 prose-blockquote:border-l-[#374151] prose-blockquote:font-extrabold prose-ul:marker:text-[#89888D] marker:text-red-500 prose-hr:border-1 prose-hr:border-[#89888d] prose-hr:border-opacity-20 prose-p:mt-0 prose-p:mb-0">
          <Content />
        </div>
      </MDXProvider>    
  </div>
    <div className="mb-10 max-xl:block xl:hidden">
      <button className="bg-[#1EB8CD] hover:bg-opacity-70 transition-all px-[100px] py-2 rounded-md text-nowrap md:ml-10">Deploy Now</button>
      <div className="mt-12 md:ml-4 border-t border-t-[#374151] border-opacity-50">
        <div className="text-description-color mt-6 md:ml-8 flex flex-col gap-5 mb-20">
          <div className="flex gap-5"><img src={Calendar} alt="Calendar" className="w-4" /><span>Created on Feb 21, 2024</span></div>
          <div className="flex gap-5"><img src={Download} alt="Download" className="w-4" /><span>440 total projects</span></div>
          <div className="flex gap-5 text-green"><img src={CheckMark} alt="CheckMark" className="w-4" /><span>100% success on reacent deploys</span></div>
          <div className="flex gap-5"><img src={DocumentFolder} alt="DocumentFolder" className="w-5" /><span>AI/ML</span></div>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default DetailsPage;