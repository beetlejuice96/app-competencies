import GuestGuard from "@/auth/guest-guard";
import { paths } from "@/paths";
import NavBar from "@/platform/components/navbar/nav-bar";
import Image from "next/image";
import Link from "next/link";
import PplayLogo from "@/assets/logo-init.svg";
import HeroImage from "@/assets/hero-image.png";
const LinkButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-black/30 hover:text-white transition duration-100 ease-in-out"
    >
      {children}
    </Link>
  );
};

//TODO: This page should be change to Landing page.

export default async function Landing() {
  return (
    <NavBar>
      <main className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full max-w-lg">
            <Image
              src={HeroImage}
              alt="PPlay logo"
              width={1000}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <div className="lg:text-left">
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-primary">PPlay</span>
            </h1>
            <p className="py-2 text-lg text-gray-500">
              The ultimate gaming event of the summer!
            </p>
            <Link
              href={paths.auth.signIn}
              className="btn btn-primary text-white 
              hidden lg:inline
              "
            >
              Ingresar
            </Link>
          </div>
          <Link
            href={paths.auth.signIn}
            className="btn btn-primary text-white 
            lg:hidden w-full"
          >
            Ingresar
          </Link>
        </div>
      </main>
    </NavBar>
  );
}
