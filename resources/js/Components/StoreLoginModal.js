import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, UserIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Link, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "./ValidationErrors";

const StoreLoginModal = ({ isVisible = false, toggleModal, toggleRegisterModal, errors = null }) => {
  const cancelButtonRef = useRef(null);

  const { post, data, setData, wasSuccessful } = useForm({
    email: "",
    password: "",
    remember: "",
  });

  const _loginSubmit = () => {
    post(route("login"));
  };

  const _continueAsGuest = () => {
    console.log("Continue as Guest");
  };

  useEffect(() => {
    if (wasSuccessful) {
      toggleModal();
    }
  }, [wasSuccessful]);

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {
          toggleModal();
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full lg:max-w-2xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <UserIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
                  </div>
                  <div className="mt-3 flex-grow text-center sm:mt-0 sm:ml-4 sm:text-left text-sm">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 py-2">
                      Iniciar Sesión
                    </Dialog.Title>
                    <div className="mt-2">
                      <ValidationErrors errors={errors} />
                      <div className="mb-2">
                        <label className="block">Usuario</label>
                        <input
                          type="email"
                          className="block w-full border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("email", e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block">Contraseña</label>
                        <input
                          type="password"
                          className="block w-full border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("password", e.target.value);
                          }}
                        />
                      </div>

                      <p className="text-sm text-gray-500">
                        <Link href={route("password.email")} className="underline cursor-pointer">
                          Recuperar Contraseña
                        </Link>
                        &nbsp;|&nbsp;
                        <a
                          className="underline cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleRegisterModal();
                          }}
                        >
                          Crear Cuenta
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
                <div>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => toggleModal()}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      _loginSubmit();
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      _continueAsGuest();
                    }}
                  >
                    Continuar como Invitado
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StoreLoginModal;
