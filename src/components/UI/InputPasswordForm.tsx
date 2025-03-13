import { useState } from "react";
import InputForm from "./InputForm";
import { Eye, EyeClosed } from "lucide-react";
import { InputFormProps } from "./InputForm";

export default function InputPasswordForm(props: InputFormProps) {
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  return (
    <InputForm {...props} type={isPassVisible ? "text" : "password"}>
      <button
        type="button"
        onClick={() => setIsPassVisible((prev: boolean) => !prev)}
      >
        {isPassVisible ? <Eye /> : <EyeClosed />}
      </button>
    </InputForm>
  );
}
