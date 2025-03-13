import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import Modal from "./UI/Modal";
import { useNavigate } from "react-router-dom";
import Link from "./UI/Link";
import { registerUser } from "../services/todosApi";
import useToast from "./UI/Toast";
import InputForm from "./UI/InputForm";
import InputPasswordForm from "./UI/InputPasswordForm";

type RegState = {
  fetching: boolean;
  response: { status: string; message: string; error?: string } | null;
  error: string | null;
  errorInputs: {
    email?: string | null;
    password?: string | null;
    passwordConfirm?: string | null;
  } | null;
};

function parseErrorsFromResponse(json: any, type: string) {
  if (typeof json.message === "string") {
    return json.message.includes(type);
  } else {
    return json.message?.map((error: string) => error.includes(type))[0];
  }
}

export default function RegisterModalForm() {
  const [fetchingStatus, setFetchingStatus] = useState<RegState>({
    fetching: false,
    response: null,
    error: null,
    errorInputs: null,
  });

  const { ToastPortal, showToast } = useToast();
  const { themeColor } = useTheme();
  const navigateTo = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const passwordsMatch =
      event.currentTarget.password.value ===
      event.currentTarget.passwordConfirm.value;

    if (!passwordsMatch) {
      setFetchingStatus({
        fetching: false,
        response: null,
        error: "Las contraseñas no coinciden",
        errorInputs: {
          passwordConfirm: "Las contraseñas ingresadas deben coincidir",
        },
      });
      return;
    }

    setFetchingStatus({
      fetching: true,
      response: null,
      error: null,
      errorInputs: null,
    });

    try {
      const response = await registerUser({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      });
      const json = await response.json();
      if (!response.ok) {
        showToast(json.message, { type: "error" });

        const errorEmail = parseErrorsFromResponse(json, "email");
        const errorPass = parseErrorsFromResponse(json, "password");

        setFetchingStatus({
          fetching: false,
          response: null,
          error: json.message,
          errorInputs: {
            email: errorEmail ? "Ingresa un email con un formato válido" : null,
            password: errorPass
              ? "La contraseña debe tener al menos 8 caracteres"
              : null,
            passwordConfirm: null,
          },
        });
      } else {
        showToast("Ya estas registrado! redireccionando...", {
          type: "success",
        });
        setFetchingStatus({
          fetching: false,
          response: json,
          error: null,
          errorInputs: null,
        });
        setTimeout(() => navigateTo("/login"), 2000);
      }
    } catch (error) {
      setFetchingStatus({
        fetching: false,
        response: null,
        errorInputs: null,
        error: (error as Error).message,
      });
    }
  }

  return (
    <>
      <ToastPortal />
      <Modal className="min-w-[360px] w-[560px]" isOpen={true} onClose={null}>
        <Modal.Header onClose={null}>
          <h2 className="font-bold">Registro</h2>
        </Modal.Header>
        <form
          onSubmit={fetchingStatus.fetching ? undefined : handleLogin}
          className="space-y-4"
        >
          <div>
            {fetchingStatus.error && (
              <p>
                <span className="text-rose-500">Error: </span>
                {fetchingStatus.error}
              </p>
            )}

            <p>{fetchingStatus.response?.message}</p>
            <InputForm
              label="Correo electrónico"
              name="email"
              type="email"
              invalidMessage="Ingresa un email con un formato válido"
              disabled={fetchingStatus.fetching}
              error={fetchingStatus.errorInputs?.email}
              required
            />

            <InputPasswordForm
              label="Contraseña"
              name="password"
              pattern=".{8,}"
              invalidMessage="La contraseña debe tener al menos 8 caracteres"
              type="password"
              disabled={fetchingStatus.fetching}
              error={fetchingStatus.errorInputs?.password}
              required
            />

            <InputPasswordForm
              label="Repetir contraseña"
              name="passwordConfirm"
              type="password"
              pattern=".{8,}"
              invalidMessage="La contraseña debe tener al menos 8 caracteres"
              disabled={fetchingStatus.fetching}
              error={fetchingStatus.errorInputs?.passwordConfirm}
              required
            />
          </div>

          <div className="flex flex-col mt-2 items-center justify-between gap-2">
            <button
              disabled={fetchingStatus.fetching}
              type="submit"
              className={`w-80 flex justify-center mt-8 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-${themeColor}-700 
            ${
              fetchingStatus.fetching ? "bg-slate-500" : `bg-${themeColor}-500`
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
            >
              {fetchingStatus.fetching ? "Enviando..." : "Registrarme "}
            </button>
          </div>
        </form>
        <Modal.Footer>
          <div className="flex flex-col">
            <div className="flex flex-col mt-3 justify-center gap-2">
              <p className="text-sm text-slate-500">
                ¿Ya creaste tu cuenta antes?
                <br />
                <Link to="/login">
                  <strong>Iniciar Sesión</strong>
                </Link>
              </p>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
