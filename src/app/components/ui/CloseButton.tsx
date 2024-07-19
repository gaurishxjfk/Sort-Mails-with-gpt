import React from "react";

const CloseButton = ({ classname }: { classname: string }) => {
  return (
    <div className="relative ml-auto my-auto mr-12">
      <span
        className={`h-1 w-4 rotate-45 absolute inset-0 ${classname}`}
      ></span>
      <span
        className={`h-1 w-4 -rotate-45 absolute inset-0 ${classname}`}
      ></span>
    </div>
  );
};

export default CloseButton;
