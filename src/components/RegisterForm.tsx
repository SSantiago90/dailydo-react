import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import Modal from "./UI/Modal";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/todosApi";
import useToast from "./UI/Toast";

type RegState = {
  response: { status: string; message: string; error?: string } | null;
  fetching: boolean;
  error: string | null;
};

export default function RegisterModalForm() {
  const [fetchingStatus, setFetchingStatus] = useState<RegState>({
    fetching: false,
    response: null,
    error: null,
  });

  const { ToastPortal, showToast } = useToast();
  const { themeColor } = useTheme();
  const navigateTo = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFetchingStatus({ fetching: true, response: null, error: null });
    try {
      const response = await registerUser({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      });
      const json = await response.json();
      if (!response.ok) {
        showToast(json.message, { type: "error" });
        setFetchingStatus({
          fetching: false,
          response: null,
          error: json.message,
        });
      } else {
        showToast("Ya estas registrado! redireccionando...", {
          type: "success",
        });
        setFetchingStatus({ fetching: false, response: json, error: null });
        setTimeout(() => navigateTo("/login"), 2000);
      }
    } catch (error) {
      setFetchingStatus({
        fetching: false,
        response: null,
        error: (error as Error).message,
      });
    }
  }

  return (
    <>
      <ToastPortal />
      <Modal className="min-w-[360px] w-[560px]" isOpen={true} onClose={null}>
        <Modal.Header onClose={() => {}}>
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
              disabled={fetchingStatus.fetching}
              required
            />
          </div>

          <div>
            <InputForm
              label="Contraseña"
              name="password"
              type="password"
              disabled={fetchingStatus.fetching}
              required
            />
          </div>

          <InputForm
            label="Repetir contraseña"
            name="password-confirm"
            type="password"
            disabled={fetchingStatus.fetching}
            required
          />

          <div className="flex flex-col mt-2 items-center justify-between gap-2">
            <button
              disabled={fetchingStatus.fetching}
              type="submit"
              className={`w-80 flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-${themeColor}-700 
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
                <a
                  href="#"
                  className={`text-sm text-slate-500 hover:text-${themeColor}-500`}
                >
                  <br />
                  <Link to="/login">
                    <strong>Iniciar Sesión</strong>
                  </Link>
                </a>
              </p>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function InputForm({
  label,
  name,
  type = "text",
  disabled,
  error,
  onChange,
  pattern,
  required,
}: any) {
  const { themeColor } = useTheme();
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-400"
      >
        {label}
      </label>
      <input
        onChange={onChange || null}
        disabled={disabled}
        required={required}
        type={type}
        id={name}
        name={name}
        pattern={pattern}
        className={`text-slate-800 focus:border-${themeColor}-300  focus:ring-${themeColor}-200 ${
          disabled ? "bg-slate-200 text-slate-500" : ""
        } mt-1  mx-auto block w-80 rounded-md border-slate-300 shadow-sm focus:ring  focus:ring-opacity-50 appearance-none bg-white`}
      />
      {error && (
        <span className="text-xs text-slate-400 text-left">{error}</span>
      )}
    </div>
  );
}
