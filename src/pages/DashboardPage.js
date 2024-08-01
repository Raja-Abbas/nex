import React, { useState } from "react";
import Globe from "../assets/svgs/globe.svg";
import { deploymentData } from "../constants/Framework";
import { useCardTitle } from "../context/CardTitleContext";
import { useCredit } from "../context/CreditContext";
import ChatBotIcon from "../components/ChatBotIcon";

// Dummy function to simulate sending an email
const sendEmailMock = async (email, userName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock email sent to ${email} for ${userName}`);
      resolve({ status: 'success' });
    }, 1000); 
  });
};

const getUserNameByEmail = async (email) => {
  return email.split('@')[0]; 
};

function DashboardPage({ selectedCard }) {
  const { cardTitle } = useCardTitle();
  const { credit } = useCredit();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);

  const cardToDisplay = selectedCard || {
    title: cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1),
  };

  const handleReferFriend = async (e) => {
    e.preventDefault();
    if (sentEmails.some(sentEmail => sentEmail.email === email)) {
      setMessage('Invitation already sent to this email.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    
    try {
      const userName = await getUserNameByEmail(email);
      const result = await sendEmailMock(email, userName);

      if (result.status === 'success') {
        setSentEmails((prevEmails) => [...prevEmails, { email, userName }]);
        setMessage(`Invitation sent successfully to ${email}`);
        setEmail('');
        setFormVisible(false);
        setTimeout(() => setMessage(''), 2000);
      } else {
        throw new Error('Failed to send invitation');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to send invitation. Please try again.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="grid max-lg:px-4 w-full scrollbar overflow-x-hidden gap-4 sm:gap-[50px] justify-center max-lg:grid-cols-1 max-lg:grid-rows-2 pt-20">
      <div className="relative w-full lg:py-3 xl:h-[56px] flex items-center max-md:px-2 md:px-6 bg-[black] text-white border border-[#3D3F40] rounded-[7px]">
        <p className="font-normal max-md:px-1 max-md:text-base md:text-lg rounded-lg py-1 md:px-3 text-dark-blue">
          Exclusive nexlayer credits{" "}
          <span className="max-md:text-[10px] md:text-xl font-thin mx-5"> | </span>{" "}
          ${credit.toFixed(0)}
        </p>
        <button
          onClick={() => setFormVisible(true)}
          className="z-20 text-black absolute end-1 bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md max-md:text-xs md:text-lg px-4 lg:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Refer a Friend
        </button>
      </div>
      {isFormVisible && (
        <form onSubmit={handleReferFriend} className="text-black flex items-center justify-center gap-2 max-w-[800px] max-md:flex-col">
          <input
            type="email"
            name="to_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
            className="relative w-full lg:py-1 xl:h-[42px] max-md:px-2 md:px-4 text-dark-blue bg-[black] border border-[#3D3F40] rounded-[7px]"
          />
          <input type="submit" value="Send Invitation" className="cursor-pointer p-2 bg-light-blue hover:bg-opacity-50 text-white rounded" />
        </form>
      )}
      {message && <p className="text-center text-green absolute inset-0 top-5">{message}</p>}
      {sentEmails.length > 0 && (
        <div className="text-white">
          <h3 className="text-lg font-semibold text-light-blue">Invited users</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {sentEmails.map(({ email, userName }, index) => (
              <li key={index} className="flex p-2 px-5 bg-black w-[50%] rounded-lg">
                <p className="min-w-[20px] text-description-color">{index + 1}.</p>
                <div className="flex flex-col">
                <p className="text-dark-blue">{userName}</p>
                <p className="text-description-color">{email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid max-md:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 pb-10">
        <div className="bg-card-color flex flex-col justify-center items-start gap-3 max-md:text-nowrap max-md:w-[280px] md:w-[380px] border border-[#32474C] relative rounded-lg py-4 max-md:px-2 md:px-6 shadow-xl">
          <div className="flex w-full justify-between">
            <div className="text-lg text-white tracking-0 font-[300]">
              {cardToDisplay.title} Application
            </div>
            <div>
              <a
                href="/build"
                className="px-[10px] py-[4.5px] font-normal text-sm rounded-full bg-light-blue text-[black]"
              >
                Redeploy
              </a>
            </div>
          </div>
          <a
            href={deploymentData.url}
            className="flex gap-2 items-center"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Globe} alt="Globe" className="w-4 h-5" />
            <p className="text-base text-dark-blue leading-[24px] font-normal">
              https://{cardToDisplay.title.toLowerCase()}-3hp0.ondeployx.com
            </p>
          </a>
          <p className="text-base text-white leading-[24px]">1 service </p>
        </div>
      </div>
      <ChatBotIcon />
    </div>
  );
}

export default DashboardPage;
