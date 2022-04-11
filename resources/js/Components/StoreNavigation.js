import { Fragment, useEffect, useState, useCallback } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, UserIcon, SearchIcon, MenuIcon, XIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import numeral from "numeral";
import debounce from "lodash.debounce";
import { Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StoreNavigation({ showAside, hideAside, categories = [], auth, cart, toggleLoginModal, toggleRegisterModal }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { post } = useForm();

  useEffect(() => {
    const _submitSearch = async () => {
      setIsSearching(true);
      const { data } = await axios.get(`/products/search`, {
        params: {
          q: searchQuery,
          format: "json",
        },
      });

      setShowResults(true);
      setSearchResults(data);
      setIsSearching(false);
    };

    let timeoutId = setTimeout(() => {
      if (searchQuery) {
        _submitSearch();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const _onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Disclosure as="nav" className={`bg-black fixed w-full z-50 ${location.pathname === "/" ? "opacity-80" : ""}`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-28">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir Menú</span>
                  {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <img className="h-20 w-auto" src="/static/img/logotipo_papaloapan.png" alt="Papaloapan" />
                  </Link>
                </div>

                <div className="hidden flex-1 sm:block sm:ml-6 md:flex items-center justify-around">
                  {showSearch && (
                    <div className="w-full relative">
                      <input type="text" className="w-full rounded" placeholder="Escriba su búsqueda" onChange={_onSearchChange} value={searchQuery} />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchResults([]);
                          setShowResults(false);
                          setSearchQuery("");
                          setShowSearch(false);
                        }}
                        className="absolute z-50 right-2 top-2"
                      >
                        <XIcon className="w-6 h-6" />
                      </button>
                      {showResults && (
                        <div className="bg-white absolute w-full shadow rounded overflow-hidden overflow-y-scroll h-96">
                          <ul className="w-full">
                            {searchResults.map((item, index) => {
                              return (
                                <li key={index.toString()} className="border-b">
                                  <Link
                                    as="button"
                                    onClick={(e) => {
                                      setSearchResults([]);
                                      setShowResults(false);
                                      setSearchQuery("");
                                      setShowSearch(false);
                                    }}
                                    href={item.path}
                                    className="flex gap-2 w-full relative px-2 py-1 items-center"
                                  >
                                    <img src={item.featured_image_thumbnail_url} className="w-12 h-12 rounded" />
                                    <div className="text-sm">
                                      <span className="block font-bold">{item.name}</span>
                                      <span className="block text-red-700">{numeral(item.price).format("$ 0,000.00")}</span>
                                    </div>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {!showSearch && (
                    <div className="flex self-center space-x-4">
                      {categories.length > 0 &&
                        categories.map((item) => (
                          <Link
                            key={item.name}
                            href={`/categoria/${item.slug}`}
                            className={classNames(
                              item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            // aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSearch(true);
                  }}
                  className="p-1 mx-1 text-gray-100 hover:text-white"
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className="p-1 mx-1 text-gray-100 hover:text-white">
                        <span className="sr-only">Abrir Menú de Usuario</span>
                        <UserIcon className="h-6 w-6" />
                      </Menu.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {auth.user !== null && (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/mi-cuenta" className={classNames(active ? "bg-gray-100" : "", "block w-full px-4 py-2 text-sm text-gray-700")}>
                                    Mi Cuenta
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      post(route("logout"));
                                    }}
                                    className={classNames(active ? "bg-gray-100" : "", "block w-full text-left px-4 py-2 text-sm text-gray-700")}
                                  >
                                    Cerrar Sesión
                                  </button>
                                )}
                              </Menu.Item>
                            </>
                          )}

                          {auth.user === null && (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      toggleLoginModal();
                                    }}
                                    className={classNames(active ? "bg-gray-100" : "", "block w-full text-left px-4 py-2 text-sm text-gray-700")}
                                  >
                                    Iniciar Sesión
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      toggleRegisterModal();
                                    }}
                                    className={classNames(active ? "bg-gray-100" : "", "block w-full text-left px-4 py-2 text-sm text-gray-700")}
                                  >
                                    Registro
                                  </button>
                                )}
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                {/* <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className="p-1 mr-2 text-gray-100 hover:text-white">
                        <span className="sr-only">Abrir Búsqueda</span>
                        <SearchIcon className="h-6 w-6" />
                      </Menu.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <input
                              onBlur={(e) => {
                                e.preventDefault();
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              onFocus={(e) => {
                                e.preventDefault();
                              }}
                              placeholder="Escriba su búsqueda"
                            />
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu> */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    showAside();
                  }}
                  href={route("store.cart.index")}
                  className="p-1 mx-1 text-gray-100 hover:text-white relative"
                >
                  {Object.keys(cart).length > 0 && (
                    <span className="absolute right -top-2.5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {Object.keys(cart).length}
                    </span>
                  )}
                  <span className="sr-only">Ver Carrito de Compras</span>
                  <ShoppingCartIcon className="h-6 w-6 rounded-full" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
