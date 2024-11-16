import classNames from "classnames";

type InputPlaceholderProps = {
  index: number;
  onChange: (text: string) => void;
};

function InputPlaceholder({ onChange, index }: InputPlaceholderProps) {
  const classesInput = classNames(
    "bg-transparent text-slate-300 py-1 px-4 w-full max-w-full box-border flex outline-none focus-visible:border-none hover:border-none"
  );

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // give "focus" to previous element not the placeholder
    e.preventDefault();
    console.log("event", e);
  };

  return (
    <>
      <li className="flex-1 w-full flex items-center">
        <input
          onFocus={handleFocus}
          className={classesInput}
          type="text"
          value=""
        />
      </li>
      <hr className="border-t-2 mb-1 mx-2 border-slate-600 border-opacity-30" />
    </>
  );
}

export default InputPlaceholder;
