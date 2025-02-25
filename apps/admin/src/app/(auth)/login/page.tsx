import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="w-full max-w-[400px] space-y-6 px-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your admin account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
