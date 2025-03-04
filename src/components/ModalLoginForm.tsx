import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import Modal from "./UI/Modal";
import { SessionType } from "../types/Session.type";
import { Link } from "react-router-dom";
import CircleIcon from "./UI/CircleIcon";
import useToast from "./UI/Toast";

type LoginProps = {
  isOpen: boolean;
  onClose: null | (() => void);
  onConfirm: (data: SessionType) => void;
};

type LoginState = {
  fetching: boolean;
  response: SessionType | null;
  error: string | null;
};

export default function ModalLoginForm({
  isOpen,
  onClose,
  onConfirm,
}: LoginProps) {
  const [fetchingStatus, setFetchingStatus] = useState<LoginState>({
    fetching: false,
    response: null,
    error: null,
  });

  const { themeColor } = useTheme();
  const { showToast, ToastPortal } = useToast();

  const icons = [
    { icon: "/google-icon.svg", provider: "Google" },
    { icon: "/fb-icon.svg", provider: "Facebook" },
  ];

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFetchingStatus({ fetching: true, response: null, error: null });
    const loginEndpoint = "http://localhost:3000/auth/login";

    const request = fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      }),
    });
    request
      .then((response) => {
        if (!response.ok) {
          setFetchingStatus({
            fetching: false,
            response: null,
            error: response.statusText,
          });
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setFetchingStatus({ fetching: false, response: data, error: null });
        onConfirm(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Modal
        className="min-w-[360px] w-[560px]"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Modal.Header onClose={onClose}>
          <h2 className="font-bold">Iniciar sesión</h2>
        </Modal.Header>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <p>{fetchingStatus.error}</p>
            <p>{fetchingStatus.response?.message}</p>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-400"
            >
              Correo electrónico o nombre de usuario
            </label>
            <input
              disabled={fetchingStatus.fetching}
              type="text"
              id="email"
              name="email"
              className={`mt-1 mx-auto block w-80 rounded-md border-slate-300 shadow-sm focus:border-${themeColor}-300 focus:ring focus:ring-${themeColor}-200 focus:ring-opacity-50 appearance-none bg-white`}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-400"
            >
              Contraseña
            </label>
            <input
              disabled={fetchingStatus.fetching}
              type="password"
              id="password"
              name="password"
              className={`mt-1 mx-auto block w-80 rounded-md border-slate-300 shadow-sm focus:border-${themeColor}-300 focus:ring focus:ring-${themeColor}-200 focus:ring-opacity-50`}
              required
            />
          </div>
          <div className="flex flex-col mt-2 items-center justify-between gap-2">
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center mx-auto">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className={`h-4 w-4 rounded border-slate-300 text-${themeColor}-500 focus:border-${themeColor}-300 focus:ring-2`}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-slate-500 hover:text-slate-300"
              >
                Recordarme
              </label>
            </div> */}
            </div>
            <button
              disabled={fetchingStatus.fetching}
              type="submit"
              className={`w-80 flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-${themeColor}-700 bg-${themeColor}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <Modal.Footer>
          <div className="flex flex-col">
            <p className="mt-2 text-sm text-center text-slate-500">
              O inicia sesión con
            </p>

            <div className="flex justify-center mt-4 space-x-4">
              {icons.map((icon) => (
                <button
                  onClick={() => {
                    showToast(
                      "Lo sentimos: aún estamos trabajando en esta funcionalidad.",
                      { type: "error" }
                    );
                  }}
                  key={icon.provider}
                >
                  <CircleIcon
                    color="white"
                    title={icon.provider}
                    icon={icon.icon}
                  />
                </button>
              ))}
            </div>
            <div className="flex flex-col mt-3 justify-center gap-2">
              <p className="text-sm text-slate-500">
                ¿No tienes cuenta?
                <br />
                <Link
                  className={`text-sm text-slate-500 hover:text-${themeColor}-500`}
                  to="/register"
                >
                  <strong>Regístrate</strong>
                </Link>
              </p>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastPortal />
    </>
  );
}
