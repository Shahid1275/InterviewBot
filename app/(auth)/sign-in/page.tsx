import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";
import AuthForm from "@/components/AuthForm";

export default async function SignInPage() {
  const session = (await cookies()).get("session")?.value;

  if (session) {
    try {
      await auth.verifySessionCookie(session);
      redirect("/");
    } catch (error) {
      // Invalid session - handled by middleware
    }
  }

  return <AuthForm type="sign-in" />;
}
