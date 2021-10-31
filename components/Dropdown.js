import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";

export default function Dropdown() {
  return (
    <Menu as="div" className="w-24 h-11 relative">
      <div>
        <Menu.Button className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-white bg-[#1A1A1A] rounded-full">
          <ChevronDownIcon className="h-6 text-[#686868]" aria-hidden="true" />
          <img
            src="https://media.discordapp.net/attachments/898544585167482891/900334850307915806/image0.jpg"
            alt=""
            className="rounded-full w-11 h-11 absolute -right-1 object-cover"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-[#1A1A1A] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "text-white" : "text-[#CECECE]"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide`}
                  onClick={() => signOut({ redirect: false })}
                >
                  <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  Signout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
