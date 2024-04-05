import LoginForm from "@/components/Auth/LoginForm";
import { getSession, login } from "@/lib/auth";
import { redirect } from "next/navigation";
async function Login() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <LoginForm
      login={async (formData: FormData) => {
        "use server";
        return await login(formData);
      }}
    />
  );
}

export default Login;
