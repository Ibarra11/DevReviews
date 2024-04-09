import LoginForm from "@/components/Auth/LoginForm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
async function Login() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
}

export default Login;
