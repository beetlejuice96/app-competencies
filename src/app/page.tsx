import GuestGuard from "@/auth/guest-guard";
import { paths } from "@/paths";
import NavBar from "@/platform/components/navbar/nav-bar";
import Link from "next/link";

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
    // <GuestGuard>
    <NavBar>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <div>
            <div>
              Welcome, <strong>Guest</strong>!
            </div>
          </div>
          <div className="flex gap-2 text-sm mt-1">
            <div className="flex gap-2 text-sm mt-1">
              <LinkButton href={paths.auth.signIn}>Login</LinkButton>
              <LinkButton href={paths.auth.signUp}>Register</LinkButton>
            </div>
          </div>
        </div>
      </main>
    </NavBar>
    // </GuestGuard>
  );
}
