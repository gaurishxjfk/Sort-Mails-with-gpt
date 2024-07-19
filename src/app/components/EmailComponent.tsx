import { Email, getColorClass } from "./EmailList";
import CloseButton from "./ui/CloseButton";

const EmailComponent = ({
  email,
  setSelectedEmail,
  category,
}: {
  email: Email;
  setSelectedEmail: React.Dispatch<React.SetStateAction<Email | null>>;
  category: string | null;
}) => {
  return (
    <div className="border border-[#7a7a7a] absolute bg-white backdrop-blur-sm  bg-opacity-70 w-[95%] inset-x-0 mx-auto z-30 rounded-lg  shadow-2xl">
      <button
        onClick={() => setSelectedEmail(null)}
        className=" h-8 w-full flex mt-2"
      >
        <CloseButton classname="w-6 bg-gray-800 " />
      </button>
      <div className="relative p-3 text-[14px] md:text-md mt-2">
        {category !== null && (
          <span
            className={` px-1 py-0.5 text-white absolute right-5 rounded-lg ${getColorClass(
              category.toString().toLowerCase()
            )}`}
          >
            {category}
          </span>
        )}
        <div>
          <p>
            <strong>From:</strong> {email.senderName} ({email.senderEmail})
          </p>
          <p className="mt-2">{email.snippet}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailComponent;
