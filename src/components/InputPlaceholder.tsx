import classNames from "classnames";
import { useState } from "react";

type InputPlaceholderProps = {
  index: number;
  onChange: (text: string) => void;
};

function InputPlaceholder({ onChange }: InputPlaceholderProps) {
  const [focus, setFocus] = useState<boolean>(false);

  const classesInput = classNames(
    "bg-transparent placeholder:opacity-10 placeholder:italic text-slate-700 py-1 px-4 w-full max-w-full box-border flex outline-none focus-visible:border-none hover:border-none"
  );

  const classesHr = classNames(
    "border-t-1 mb-1 mx-2 transition transform duration-1000 ease-in-out ",
    {
      "border-slate-600 border-opacity-30": !focus,
      "border-rose-500 border-opacity-70": focus,
    }
  );

  /*  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // give "focus" to previous element not the placeholder
    e.preventDefault();
    console.log("event", e);
  }; */

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    setFocus(false);
    e.target.blur();
  }

  return (
    <>
      <li className="flex-1 w-full flex items-center ">
        <input
          className={classesInput}
          placeholder="Add a new task..."
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          value=""
        />
      </li>
      <hr className={classesHr} />
    </>
  );
}

export default InputPlaceholder;
