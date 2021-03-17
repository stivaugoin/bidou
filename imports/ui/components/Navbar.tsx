import { Transition } from "@headlessui/react";
import { useTracker } from "meteor/react-meteor-data";
import React, { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const MENU_ITEM = [
  { name: "Dashboard", path: "/" },
  { name: "Incomes", path: "/incomes" },
  { name: "Expenses", path: "/expenses" },
  { name: "Categories", path: "/categories" },
];

export function Navbar(): JSX.Element {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  useLayoutEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener("click", closeProfileMenu);
    }

    return () => {
      document.removeEventListener("click", closeProfileMenu);
    };
  }, [isProfileMenuOpen]);

  const { pathname } = useLocation();
  const user = useTracker(() => {
    return Meteor.user();
  }, []);

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }

    return pathname.startsWith(path);
  };

  const desktopLinkClassnames = (path: string) => {
    const classNames = "px-3 py-2 rounded-md text-sm font-medium";

    if (isActive(path)) {
      return classNames.concat(" bg-gray-900 text-white");
    }

    return classNames.concat(
      " text-gray-300 hover:bg-gray-700 hover:text-white"
    );
  };

  const mobileLinkClassnames = (path: string) => {
    const classNames = "block px-3 py-2 rounded-md text-base font-medium";

    if (isActive(path)) {
      return classNames.concat(" bg-gray-900 text-white");
    }

    return classNames.concat(
      " text-gray-300 hover:bg-gray-700 hover:text-white"
    );
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="block lg:hidden h-6 w-auto"
                src="/images/logo-white.png"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-5 w-auto"
                src="/images/logo-white.png"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {MENU_ITEM.map(({ name, path }) => (
                  <Link
                    className={desktopLinkClassnames(path)}
                    key={path}
                    to={path}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex items-center">
              {/* <!-- Profile dropdown --> */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.profile.picture}
                      alt={`Profile picture of ${user?.profile.fname} ${user?.profile.lname}`}
                    />
                  </button>
                </div>

                <Transition
                  show={isProfileMenuOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    to="/logout"
                  >
                    Sign out
                  </Link>
                </Transition>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex sm:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Heroicon name: outline/menu --> */}
              {!isProfileMenuOpen && (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
              {/* <!-- Heroicon name: outline/x --> */}
              {isProfileMenuOpen && (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isProfileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {MENU_ITEM.map(({ name, path }) => (
              <Link className={mobileLinkClassnames(path)} key={path} to={path}>
                {name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.profile.picture}
                  alt={`Profile picture of ${user?.profile.fname} ${user?.profile.lname}`}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {user?.profile.fname} {user?.profile.lname}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user?.emails?.[0].address}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                to="/logout"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
