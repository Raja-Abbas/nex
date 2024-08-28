import React, { useState, useEffect } from "react";

// Define a component that will be shown after the successful submission
const WaitlistAfter = () => (
  <div className="text-center mt-[30px]">
        <h2 className="text-light-blue text-3xl mb-[27px] font-bold leading-[150%]">
          Thank you for joining the waitlist!
        </h2>
        <p className="text-white text-lg leading-[150%] mb-[45px]">
          Your spot is secured, and we're thrilled to have you on board. {" "}
          <br className="max-md:hidden" />
          Keep an eye on your inbox to learn more about NexLayer.
        </p>
  </div>
);

const NewsletterForm = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [showWaitlistAfter, setShowWaitlistAfter] = useState(false);

  // Effect to handle post-success display logic
  useEffect(() => {
    let timer;
    if (status === "success") {
      timer = setTimeout(() => {
        setShowWaitlistAfter(true); // Show the WaitlistAfter component after 5 seconds
      }, 5000);
    }
    return () => clearTimeout(timer); // Cleanup the timer on component unmount or status change
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const previousTimestamp = localStorage.getItem("loops-form-timestamp");
    const timestamp = new Date().valueOf();

    // Rate limiting to prevent too many submissions in a short time
    if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
      setErrorMessage("Too many signups, please try again in a little while");
      setStatus("error");
      return;
    }

    localStorage.setItem("loops-form-timestamp", timestamp);

    const formBody = `userGroup=Waitlist&mailingLists=&email=${encodeURIComponent(
      email
    )}`;

    try {
      const response = await fetch(
        "https://app.loops.so/api/newsletter-form/clypyh0a200i877ithb87jvaf",
        {
          method: "POST",
          body: formBody,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error(data.message || response.statusText);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
    setShowWaitlistAfter(false);
  };

  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed w-full h-full bg-[#070707] bg-opacity-75 inset-0 z-[10000] flex items-center justify-center"
    onClick={handleOverlayClick}>
      <div className="bg-background relative text-center bg-opacity-100 z-[1000] p-6 rounded-md shadow-xl my-[45px] mx-[55px] max-md:w-full md:w-[663px] max-md:h-auto md:h-auto">
        {showWaitlistAfter ? (
          <WaitlistAfter />
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-light-blue text-3xl mb-[15px] mt-[25px] font-bold leading-[150%]">
              Join the NexLayer waitlist!
            </h2>
            <p className="text-white text-lg leading-[150%]">
              Be among the first to experience NexLayer, the cloud platform{" "}
              <br className="max-md:hidden" />
              for deploying AI-powered SaaS products instantly. Unlock{" "}
              <br className="max-md:hidden" />{" "}
              <span className="text-light-blue">$100 in NexLayer Credits </span>{" "}
              to jump start your journey.
            </p>
            <form
              className="flex flex-col items-center justify-center w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                className="z-10 text-center mt-[45px] mb-[15px] text-tiny text-white w-full block p-[13px] max-md:w-auto md:w-[435px] border-light-black bg-light-black rounded-[5px] mx-auto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {status === "loading" ? (
                <div className="z-20 text-black bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Please wait...
                </div>
              ) : (
                <button
                  type="submit"
                  className="z-20 text-black bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join the waitlist
                </button>
              )}
            </form>
            {status === "success" && (
              <p className="z-20 text-white mt-2 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Thanks! We'll be in touch!
              </p>
            )}
            {status === "error" && (
              <p className="z-20 text-white mt-2 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {errorMessage}
              </p>
            )}
            {status !== "idle" && (
              <button
                className="z-20 text-white mt-2 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={resetForm}
              >
                &larr; Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
