"use client";

import Image from "next/image";

import BurgerIcon from "@/assets/burger-icon.svg";
import PPlayLogo from "@/assets/logo-init.svg";

import UseUser from "@/hooks/use-user";

import SignOut from "@/auth/sign-out/sign-out";

import { navItems } from "./nav-items";
import NavItem from "./nav-item";

export interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }: NavBarProps) => {
  const { user } = UseUser();
  const NAV_ITEMS = navItems(!!user);
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar  flex justify-between">
          {/* <div className="lg:hidden"> */}
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <Image src={BurgerIcon} alt="burger icon" width={21} height={18} />
          </label>
          {/* </div> */}
          <Image src={PPlayLogo} alt="PPlay logo" width={113} height={60} />
          {/* add avatar */}
          {/* TODO: crear tabla de profile para poder cargar la imagen del user */}
          <div className="avatar">
            <div className="rounded-full w-10 h-10">
              <Image
                src={user?.avatar ?? "/avatar.png"}
                alt="user avatar"
                width={40}
                height={40}
              />
            </div>
          </div>
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
          {/* Sidebar content here */}

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
          <li>
            <SignOut />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
