import SignOut from "@/auth/sign-out/sign-out";
import { createClient } from "@/lib/supabase/server";
import { paths } from "@/paths";
import { cookies } from "next/headers";
import Link from "next/link";
import path from "path";

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
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const session = await supabase.auth.getSession();
  // const user = session.data?.session?.user;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <div>
            Welcome, <strong>Guest</strong>!
          </div>
        </div>

        <div className="flex gap-2 text-sm mt-1">
          <div className="flex gap-2 text-sm mt-1">
            {/* {user ? (
              <SignOut />
            ) : ( */}
            <LinkButton href={paths.auth.signIn}>Login</LinkButton>
            <LinkButton href={paths.auth.signUp}>Register</LinkButton>
            {/* )} */}
          </div>
        </div>
      </div>
    </main>
  );
}
