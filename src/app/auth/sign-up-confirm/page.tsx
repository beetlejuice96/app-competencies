import { config } from "@/config";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: `Sign up confirm | Supabase | Auth | ${config.site.name}`,
};

interface PageProps {
  searchParams: { email?: string };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center space-y-4"
      style={{ height: "100vh" }}
    >
      <h1 className="text-2xl font-bold text-center" style={{ color: "black" }}>
        Sign up confirm
      </h1>
      <p
        className="text-lg text-center text-gray-600"
        style={{ color: "black" }}
      >
        Check your email at <strong>{searchParams.email}</strong> to confirm
        your account.
      </p>

      <p
        className="text-lg text-center text-gray-600"
        style={{ color: "black" }}
      >
        If you don&apos;t see the email, check other places it might be, like
        your junk, spam, social, or other folders.
      </p>
    </div>
  );
}
