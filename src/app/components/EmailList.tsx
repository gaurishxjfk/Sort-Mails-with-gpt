"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

const mailCounts: number[] = [5, 10, 15, 20];

interface Email {
  id: string;
  snippet: string;
  senderName: string;
  senderEmail: string;
}

interface Classifications {
  id: string;
  email: string;
  category?: string[];
}

function getColorClass(work: string) {
  if (work.toLowerCase().includes("promotions")) {
    return "bg-green-500";
  } else if (work.toLowerCase().includes("social")) {
    return "bg-blue-500";
  } else if (work.toLowerCase().includes("important")) {
    return "bg-red-500";
  } else if (work.toLowerCase().includes("marketing")) {
    return "bg-yellow-500";
  } else if (work.toLowerCase().includes("spam")) {
    return "bg-gray-500";
  } else {
    return "bg-gray-200";
  }
}

const EmailList: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [mailCount, setMailCount] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingClassifications, setLoadingClassifications] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [classifications, setClassifications] = useState<Classifications[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchEmails = async () => {
      try {
        const response = await fetch(`/api/gmail/mails?mailCount=${mailCount}`);
        const data = await response.json();
        if (response.ok) {
          setEmails(data.emails);
          setLoading(false);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [mailCount]);

  const handleClassify = async () => {
    try {
      const emailsList = emails.map((i) => {
        return {
          id: i.id,
          email: i.snippet,
        };
      });
      setClassifications([]);
      setLoadingClassifications(true);
      const response = await fetch("/api/openai/classify-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailsList }),
      });

      const { classifications } = await response.json();
      setClassifications(classifications);
      setLoadingClassifications(false);
    } catch (error) {
      console.error(error);
      alert("Failed to classify emails");
    }
  };

  if (loading)
    return (
      <div className="h-[40vh] bg-white text-center pt-12">
        <p>Loading emails...</p>
      </div>
    );
  if (error)
    return (
      <div className="h-[40vh] bg-white text-center pt-12">
        <p>Error: {error}</p>
      </div>
    );

  function getCategory(id: string) {
    const classificationCat = classifications.find(
      (emailObj) => emailObj.id === id
    );
    if (classificationCat && classificationCat.category) {
      return classificationCat.category;
    }
    return [];
  }

  console.log(classifications);
  return (
    <div className="bg-white">
      <div className="flex justify-around items-center py-4">
        <select
          value={mailCount}
          className="p-[5px] rounded-lg border-2 border-blue-500 "
          onChange={(e) => setMailCount(parseInt(e.target.value, 10))}
        >
          {mailCounts.map((c) => (
            <option key={c} className="px-2">
              {c}
            </option>
          ))}
        </select>
        {emails.length > 0 && (
          <Button
            text={`${loadingClassifications ? "loading..." : "Classify"}`}
            btnHandler={handleClassify}
            className={"bg-blue-500 !mx-0"}
          />
        )}
      </div>

      <ul className="flex flex-col gap-4 mx-2 md:mx-12 my-6">
        {emails.map((email) => (
          <li
            key={email.id}
            className="relative border border-[#7a7a7a] rounded-md p-3 bg-white  bg-clip-padding backdrop-filter
                   backdrop-blur-sm bg-opacity-50 shadow-[5px_5px_0px_0px_rgba(125,160,225)] text-[14px] md:text-md"
          >
            {classifications.length > 0 && (
              <span
                className={`bg-red-500 px-1 py-0.5 text-white absolute right-5 rounded-lg ${getColorClass(
                  loadingClassifications
                    ? "Loading..."
                    : getCategory(email.id)[0].toString().toLowerCase()
                )}`}
              >
                {loadingClassifications
                  ? "Loading..."
                  : getCategory(email.id)[0]}
              </span>
            )}
            <p>
              <strong>From:</strong> {email.senderName} ({email.senderEmail})
            </p>
            <p className="line-clamp-4 md:line-clamp-none">{email.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
