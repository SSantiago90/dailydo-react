import { SessionType } from "../types/Session.type";
import RegisterModalForm from "../components/RegisterForm";

export default function Register() {
  function handleRegister(data: any) {
    console.log(data);
  }

  return (
    <div>
      <RegisterModalForm
        onConfirm={handleRegister}
        isOpen={true}
        onClose={null}
      />
    </div>
  );
}
