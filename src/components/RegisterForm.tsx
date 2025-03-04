import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import Modal from "./UI/Modal";
import { SessionType } from "../types/Session.type";
import { Link } from "react-router-dom";

type RegisterProps = {
  onConfirm: (data: any) => void;
};

type RegState = {
  fetching: boolean;
  response: SessionType | null;
  error: string | null;
};

export default function RegisterModalForm({ onConfirm }: RegisterProps) {
  const [fetchingStatus, setFetchingStatus] = useState<RegState>({
    fetching: false,
    response: null,
    error: null,
  });

  const { themeColor } = useTheme();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    console.log(event);
    onConfirm("data");
  }

  return (
    <Modal className="min-w-[360px] w-[560px]" isOpen={true} onClose={() => {}}>
      <Modal.Header onClose={() => {}}>
        <h2 className="font-bold">Registro</h2>
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
          <button
            disabled={fetchingStatus.fetching}
            type="submit"
            className={`w-80 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-500 hover:bg-${themeColor}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
      <Modal.Footer>
        <div className="flex flex-col">
          <div className="flex flex-col mt-3 justify-center gap-2">
            <p className="text-sm text-slate-500">
              ¿Ya creaste tu cuenta?
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
  );
}
