import { createClient } from "@/lib/supabase/server";
import { paths } from "@/paths";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function SignOut() {
  const logout = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    redirect(paths.auth.signIn);
  };

  return (
    <form>
      <button
        formAction={logout}
        className="text-black/30 hover:text-white transition duration-100 ease-in-out"
      >
        Logout
      </button>
    </form>
  );
}
