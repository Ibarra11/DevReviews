import RegisterForm from "@/components/Auth/RegisterForm";
import { getSession, login } from "@/lib/auth";
import { redirect } from "next/navigation";
async function Login() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return <RegisterForm />;
}

export default Login;
