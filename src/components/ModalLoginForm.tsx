import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import Modal from "./UI/Modal";
import { SessionType } from "../types/Session.type";
import Link from "./UI/Link";
import CircleIcon from "./UI/CircleIcon";
import useToast from "./UI/Toast";
import { loginUser } from "../services/todosApi";
import InputForm from "./UI/InputForm";
import Loader from "./UI/Loader";

type LoginProps = {
  isOpen: boolean;
  onClose: null | (() => void);
  onConfirm: (data: SessionType) => void;
};

type LoginState = {
  fetching: boolean;
  response: SessionType | null;
  error: { error: string; message: string } | null;
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
    showToast("Iniciando sesión...", { type: "info" });
    setFetchingStatus({ fetching: true, response: null, error: null });

    const loginData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    const request = loginUser(loginData);

    request
      .then((response) => {
        if (!response.ok) {
          response.json().then((json) => {
            setFetchingStatus({
              fetching: false,
              response: null,
              error: { error: json.error, message: json.message },
            });

            showToast(json.message, { type: "error" });
          });
        }
        return response.json();
      })

      .then((data) => {
        setFetchingStatus({ fetching: false, response: data, error: null });
        onConfirm(data);
      })
      .catch((err) => {
        setFetchingStatus({
          fetching: false,
          response: null,
          error: err.message,
        });
        if (err.message.includes("timed")) {
          const customErr =
            "Nuestro servicio está ocupado, por favor intenta de nuevo en un momento";
          showToast(customErr, { type: "error" });
          return setFetchingStatus({
            fetching: false,
            response: null,
            error: { error: "error", message: customErr },
          });
        } else {
          showToast(err.message, { type: "error" });
        }
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
            {fetchingStatus.error && (
              <>
                <p className="text-red-500">Error al iniciar sesión</p>
                <p className="text-sm">{fetchingStatus.error?.message}</p>
              </>
            )}

            <InputForm
              disabled={fetchingStatus.fetching}
              label="Correo electrónico o nombre de usuario"
              type="text"
              name="email"
              invalidMessage="El correo electr&oacute;nico debe ser v&aacute;lido"
              required
            />
          </div>
          <div>
            <InputForm
              label="Contraseña"
              disabled={fetchingStatus.fetching}
              type="password"
              name="password"
              pattern=".{8,}"
              invalidMessage="La contraseña debe tener al menos 8 caracteres"
              required
            />
          </div>
          <div className="flex flex-col mt-2 items-center justify-between gap-2">
            <div className="flex items-center justify-between"></div>
            <button
              disabled={fetchingStatus.fetching}
              type="submit"
              className={`w-80 flex justify-center mt-8 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-${themeColor}-700 bg-${themeColor}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
            >
              {fetchingStatus.fetching ? (
                <Loader className="text-white" delay={0} size={24} />
              ) : (
                "Iniciar sesión"
              )}
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
                <Link to="/register">
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
