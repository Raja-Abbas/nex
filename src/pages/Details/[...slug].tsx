"use client";
import React from "react";
import { useParams } from "react-router-dom";
import { templatesData } from "../../constants/Framework";
import StarIcon from "../../assets/svgs/star-icon.svg";
import Cube from "../../assets/svgs/cube.svg";
import NexLayer from "../../assets/svgs/nexLayer.svg";
import Calendar from "../../assets/svgs/calendar.svg";
import Download from "../../assets/svgs/download.svg";
import CheckMark from "../../assets/svgs/check-mark.svg";
import DocumentFolder from "../../assets/svgs/folder.svg";
import FourSquares from "../../assets/svgs/four-squares.svg";
import DiskStorage from "../../assets/svgs/disk-storage.svg";
import {
  GlowingStarsBackgroundCard, 
  GlowingStarsDescription,
} from "../../components/ui/glowing-stars";

export default function DynamicPage() {
  const { slug } = useParams();
  const item = templatesData.find((item) => item.title === slug);

  if (!item) {
    return <div>Item not found</div>;
  }

  const SubTitle =
    "The all-in-one app for private document chat, AI Agents, and more.";
  const Note =
    "Due to Railway container permissions, web scraping of any sort is disabled! You will need to upload those site's HTML manually.";
  return (
  <div className="text-white max-md:w-[300px] pt-10 min-h-[80vh] max-lg:w-[550px] lg:max-w-[950px] xl:max-w-[1200px] w-full flex max-md:flex-col md:gap-5">
    <div className="flex flex-col gap-10">
      <a href="/marketplace" className="flex gap-3 text-description-color"><img src={FourSquares} alt="FourSquares" className="w-5" /><span>All Templates/{item.Marketplacecategory}</span></a>
      <div className="flex gap-6 items-center">
        <img src={item.logo} alt={item.title} className="w-14 rounded-lg" />
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-semibold">{item.title}</p>
          <p className="text-lg font-semibold text-description-color">
            {SubTitle}
          </p>
        </div>
      </div>
      <GlowingStarsBackgroundCard>
        <div className="flex flex-col justify-between items-end">
          <GlowingStarsDescription>
            <div className="rounded-xl overflow-hidden max-md:min-w-[240px] md:min-w-[300px] border border-light-grey-color border-opacity-50 shadow-xl">
            <div className="bg-[#20202d] rounded-xl border-b py-4 border-light-grey-color border-opacity-50">
            <div className="px-5 py-2 rounded-xl flex items-start gap-3">
              <img src={Cube} alt="Cube" className="w-6 h-fit rounded-lg" />
              <div>
              <p className="text-white text-lg"></p>
              <p className="text-description-color text-nowrap text-base"></p>
              </div>
            </div>
            <div className="px-5 py-2 rounded-xl flex items-start gap-3">
            <img src={CheckMark} alt="CheckMark" className="w-5" /> 
            <p className="text-description-color text-nowrap text-base font-semibold"></p>
            </div>
            </div>
            <div className="px-4 py-2 bg-[#191626] flex items-start gap-3">
            <img src={DiskStorage} alt="DiskStorage" className="w-4" /> 
            <p className="text-description-color text-nowrap text-base"></p>
            </div>
            </div>
          </GlowingStarsDescription>
        </div>
      </GlowingStarsBackgroundCard>
      <div className="max-w-[750px] mt-14">
        <p className="text-3xl font-semibold">
          {item.title} on Railway is here!
        </p>
        <div className="mt-8 border-l-4 border-[#374151]">
          <p className="ml-5 text-xl italic font-semibold text-white text-opacity-70 max-w-[750px]">
            &quot;
            <span className="not-italic">&#9888;</span>
            <span className="mx-2">Heads up!</span>
            {Note}
            &quot;
          </p>
        </div>
        <p className="mt-10 border-b pb-20 border-light-grey-color border-opacity-25 flex flex-col gap-6 text-description-color font-semibold">
          <span>
          A full-stack application that enables you to turn any document, resource, or piece of content into<br className="max-lg:hidden"/>
          context that any LLM can use as references during chatting. This application allows you to pick<br className="max-lg:hidden"/>
          and choose which LLM or Vector Database you want to use as well as supporting multi-user<br className="max-lg:hidden"/>
          management and permissions. <br className="max-lg:hidden"/>
          </span>
          <span>This is a fully imaged version of the primary {item.title} repo!</span>
          <span className="flex gap-1 items-center">
            <img src={StarIcon} alt="StarIcon" className="w-4" />
            Star on Github: 
            <a href="/" className="text-white underline"> https://github.com/Mintplex-Labs/{item.title.toLowerCase()}</a>
          </span>
          <span>Includes all features of the main app including:</span>
          <span>
            <ul className="list-disc ml-6 flex flex-col gap-4">
              <li>Private embeddings</li>
              <li>LLM Support</li>
              <li>built-in vector database</li>
              <li>external chatbot support</li>
              <li>multi-user authentication</li>
              <li>Admin controls</li>
            </ul>
          </span>
          <span>
            <p className="text-white text-2xl">Supported LLMS:</p>
            <ul className="mt-6 list-disc ml-6 flex flex-col gap-4">
              <li>OpenAI</li>
              <li>Azure OpenAI</li>
              <li>Anthropic ClaudeV2</li>
              <li>Google Gemini Pro</li>
              <li>Ollama (mac/i model)</li>
              <li>LLM Suite (all models)</li>
              <li>LocalAI (all models)</li>
              <li>Together AI (chat models)</li>
              <li>Mistral</li>
            </ul>
          </span>
          <span>
            <p className="text-white text-2xl">Supported Embedding modules:</p>
            <ul className="mt-6 list-disc ml-6 flex flex-col gap-4">
              <li>{item.title} Native Embedder (default)</li>
              <li>OpenAI</li>
              <li>Azure OpenAI</li>
              <li>LLM Suite (all)</li>
              <li>LocalAI (all)</li>
            </ul>
          </span>
          <span>
            <p className="text-white text-2xl">Supported Vector Databases:</p>
            <ul className="mt-6 list-disc ml-6 flex flex-col gap-4">
              <li>LanceDB (default)</li>
              <li>Atlas DB</li>
              <li>Pinecone</li>
              <li>Weaviate</li>
              <li>Qdrant</li>
              <li>Milvus</li>
              <li>Zilliz</li>
            </ul>
          </span>
          <span className="max-w-[670px]">
            <span className="italic">Note:</span> This image is updated often but is not always in sync with the 
            `<span className="text-white">latest</span>` tag on Docker for
            the `<span className="text-white">master</span>` branch. If something is missing ping us on Discord!
          </span>
          <span className="flex flex-col gap-4">
            <p className="text-white text-2xl">LICENSE</p>
            <p>{item.title} is MIT Licensed.</p>
          </span>
        </p>
      </div>
      <div className="py-16 pt-5 max-w-[750px]">
        <span className="text-3xl font-semibold">Template Content</span>
        <div className="bg-[#191622] px-5 py-6 mt-10 rounded-xl flex gap-4">
          <img src={Cube} alt="Cube" className="w-10 p-[10px] bg-[#33313f] rounded-lg h-fit" />
          <div>
          <p className="text-white text-lg">{item.title.toLowerCase()}-docker</p>
          <p className="text-description-color text-base">mintplexlabs/{item.title.toLowerCase()}:railway</p>
          </div>
        </div>
      </div>
    </div>
    <div className="md:mt-24">
      <button className="bg-[#732993] hover:bg-opacity-70 transition-all px-[100px] py-2 rounded-md text-nowrap md:ml-10">Deploy Now</button>
      <div className="mt-12 md:ml-4 border-t border-t-[#374151] border-opacity-50">
      <div className="flex py-2 px-4 w-fit justify-center bg-dark-gray gap-2 items-center">
      <img src={NexLayer} alt="NexLayer Logo" className="w-6" />
      <p className="font-medium text-lg text-white">
        <span className="font-normal text-description-color">
          By{" "}
        </span>
        {item.provider}
      </p>
      </div>
      <div className="text-description-color mt-6 md:ml-8 flex flex-col gap-5">
        <div className="flex gap-5"><img src={Calendar} alt="Calendar" className="w-4" /><span>Created on Feb 21, 2024</span></div>
        <div className="flex gap-5"><img src={Download} alt="Download" className="w-4" /><span>440 total projects</span></div>
        <div className="flex gap-5 text-green"><img src={CheckMark} alt="CheckMark" className="w-4" /><span>100% success on reacent deploys</span></div>
        <div className="flex gap-5"><img src={DocumentFolder} alt="DocumentFolder" className="w-5" /><span>AI/ML</span></div>
      </div>
      </div>
    </div>
  </div>
  );
}
