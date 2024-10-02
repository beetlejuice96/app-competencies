// FIXME: ver de hacer el navbar mas aislado. que no envuelva todo el home asi no lo hace client side a todo.
"use client";

import Image from "next/image";

import BurgerIcon from "@/assets/burger-icon.svg";
import PPlayLogo from "@/assets/logo-init.svg";

import UseUser from "@/hooks/use-user";

import SignOut from "@/auth/sign-out/sign-out";

import { navItems } from "./nav-items";
import NavItem from "./nav-item";
import UserInfo from "./user-info";

export interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }: NavBarProps) => {
  const { user } = UseUser();
  const NAV_ITEMS = navItems(!!user);
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar flex justify-between pt-2">
          {/* <div className="lg:hidden"> */}
          <Image src={PPlayLogo} alt="PPlay logo" width={30} height={30} />
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <Image src={BurgerIcon} alt="burger icon" width={21} height={18} />
          </label>
          {/* </div> */}
          {/* add avatar */}
          {/* TODO: crear tabla de profile para poder cargar la imagen del user */}
          {/* <div className="avatar">
            <div className="rounded-full w-10 h-10">
              <Image
                src={user?.avatar ?? "/avatar.png"}
                alt="user avatar"
                width={40}
                height={40}
              />
            </div>
          </div> */}
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
          {user && (
            <UserInfo
              image={user.avatar ?? "/avatar.png"}
              name={user.name ?? "Guest"}
              email={user.email ?? "Guest"}
            />
          )}
          {NAV_ITEMS.map((item) => {
            return (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                onClick={item.onClick}
              />
            );
          })}
          {user && (
            <li>
              <SignOut />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
