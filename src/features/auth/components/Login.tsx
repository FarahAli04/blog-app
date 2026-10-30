import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Button, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { IoPersonSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner7 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { loginSchema, type loginSchemaType } from "../../../Schema/Login.schema";
import { signIn } from "../apis/login.api";
import { authContext } from "../../../context/auth.context";

export default function Login() {

  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  const context = useContext(authContext)
  if (!context) {
    throw new Error('')
  }
  const { isLogin, setLogin ,setUser } = context

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: loginSchemaType) {
    setLoading(true)
    try {
      const res = await signIn(data);
      if (res?.success) {
        localStorage.setItem('tkn',res?.data?.token)
        localStorage.setItem('user',JSON.stringify(res?.data?.user))
        setLogin(res?.data?.token)
        setUser(res?.data?.user)
        console.log(res?.data?.token);
        
        toast.success(res?.message)
        navigate('/feed')
      }
    } catch (error: any) {
      toast.error(error.response.message);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex max-w-md flex-col gap-4 my-10 mx-auto"
      >
        <div>
          <TextInput
            {...register("email")}
            icon={IoPersonSharp}
            id="email"
            type="text"
            placeholder="email"
            theme={{
              field: {
                input: {
                  colors: {
                    gray: "!bg-slate-50 !text-gray-900",
                  },
                },
              },
            }}
          />
          {errors?.email && (
            <span className="text-rose-600">{errors.email?.message}</span>
          )}
        </div>
        <div>
          <TextInput
            {...register("password")}
            id="password"
            type="password"
            placeholder="password"
            theme={{
              field: {
                input: {
                  colors: {
                    gray: "!bg-slate-50 !text-gray-900",
                  },
                },
              },
            }}
          />
          {errors?.password && (
            <span className="text-rose-600">{errors.password?.message}</span>
          )}
        </div>
        <Button
          disabled={isLoading}
          type="submit" color="none" className=" rounded-xl py-3 w-full text-base font-extrabold text-white cursor-pointer transition disabled:opacity-60 bg-[#910767] hover:bg-[#620446]">
          {isLoading ? <ImSpinner7></ImSpinner7> : 'Login'}
        </Button>
      </form>
    </div>
  );
}
