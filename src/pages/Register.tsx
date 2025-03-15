import Logo from "../components/Logo";
import RegisterModalForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="relative">
      <div className="z-50 mx-auto sticky flex align-center text-center">
        <Logo still />
      </div>

      <RegisterModalForm />
    </div>
  );
}
