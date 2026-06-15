"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react"
import { toast } from "sonner"
import useAuthStore from "@/store/useAuthStore";
import {useRouter} from "next/navigation";

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loading,signup,login} = useAuthStore()
  const router = useRouter()


  const handleLogin = async () => {
    const result = await login({email,password})
    if(result.success) {
      toast.success(result.message)
      router.push("/")
    }
    else toast.error(result.message)
  }

  const handleSignup = async () => {
    const result = await signup({username,email,password})
    if (result.success) {
      toast.success(result.message);

      setTimeout(() => {
        setIsLogin(true)
      }, 1000);
    }
    else toast.error(result.message)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-linear-190 from-purple-300 to-blue-300">
      <Toaster />
      <Card className="flex h-auto w-auto flex-col items-center px-10 py-10 shadow-xl">
        <Label className="text-3xl font-bold">
          {isLogin ? "Welcome Back" : "Create Account"}
        </Label>
        <div className="flex w-100 flex-col gap-y-5">
          {!isLogin &&
              <Input
                  type="email"
                  className="h-13 pl-5"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
          }
            <Input
              type="email"
              className="h-13 pl-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <Input
            type="password"
            className="h-13 pl-5"
            placeholder="Password   "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-y-3">
          <Button
            disabled={loading}
            onClick={isLogin ? () => handleLogin() : () => handleSignup()}
            className="h-13 w-100 text-xl"
          >
            {isLogin ? "Log in" : "Sign up"}
          </Button>
          <Label
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-lg"
          >
            Already have an account ? {isLogin ? "Sign up" : "Log in"}
          </Label>
          {loading && <Label>Wait a moment....</Label>}
        </div>
      </Card>
    </div>
  )
}

export default Auth
