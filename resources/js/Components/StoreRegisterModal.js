import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import { Link, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "./ValidationErrors";

const StoreRegisterModal = ({ toggleModal, toggleLoginModal, isVisible = false, errors = null }) => {
  const cancelButtonRef = useRef(null);

  const { data, setData, wasSuccessful, post, processing, reset } = useForm({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });

  const _registerSubmit = () => {
    post(route("register"));
  };

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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <UserIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
                  </div>
                  <div className="mt-3 flex-grow text-center sm:mt-0 sm:ml-4 sm:text-left text-sm">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 py-2">
                      Registro
                    </Dialog.Title>
                    <div className="mt-2">
                      <ValidationErrors errors={errors} />
                      <div className="mb-2 md:flex gap-4 items-center justify-center">
                        <label className="block md:w-1/4">Correo Eletrónico</label>
                        <input
                          type="email"
                          className="block w-full md:w-3/4 border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("email", e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-2 md:flex gap-4 items-center justify-center">
                        <label className="block md:w-1/4">Contraseña</label>
                        <input
                          type="password"
                          className="block w-full md:w-3/4 border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("password", e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-2 md:flex gap-4 items-center justify-center">
                        <label className="block md:w-1/4">Confirmar Contraseña</label>
                        <input
                          type="password"
                          className="block w-full md:w-3/4 border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-2 md:flex gap-4 items-center justify-center">
                        <label className="block md:w-1/4">Nombre</label>
                        <input
                          type="text"
                          className="block w-full md:w-3/4 border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("name", e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-2 md:flex gap-4 items-center justify-center">
                        <label className="block md:w-1/4">Apellidos</label>
                        <input
                          type="text"
                          className="block w-full md:w-3/4 border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("lastname", e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-2 md:flex gap-4 items-center justify-center">
                        <label className="block md:w-1/4">Teléfono</label>
                        <input
                          type="phone"
                          className="block w-full md:w-3/4 border border-gray-400 px-4 py-2 rounded"
                          onChange={(e) => {
                            setData("phone", e.target.value);
                          }}
                        />
                      </div>

                      <p className="text-sm text-gray-500 mt-4">
                        <Link href={route("password.email")} className="underline cursor-pointer">
                          Recuperar Contraseña
                        </Link>
                        &nbsp;|&nbsp;
                        <a
                          className="underline cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLoginModal();
                          }}
                        >
                          Iniciar Sesión
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    _registerSubmit();
                  }}
                >
                  Registrarme
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal();
                  }}
                  ref={cancelButtonRef}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StoreRegisterModal;
