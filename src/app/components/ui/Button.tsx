export const Button = ({
  text,
  btnHandler,
  className,
}: {
  text: string;
  btnHandler: () => void;
  className: string;
}) => {
  return (
    <button
      className={`bg-[#288cfd] text-[#ffffff] font-bold px-3 py-2 rounded-lg mx-auto ${className}`}
      onClick={() => btnHandler()}
    >
      {text}
    </button>
  );
};
