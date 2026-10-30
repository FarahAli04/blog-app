import { Button, Select, TextInput } from "flowbite-react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaPerson } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchemaObj, type RegisterSchema } from "../../../Schema/RegisterSchema";
import {signUp} from '../apis/register.api'
import { toast } from "react-toastify";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [isLoading,setLoading] = useState(false);
  const navigate = useNavigate()

  const {register,handleSubmit,formState:{errors}} = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchemaObj),
    defaultValues:{
      name:'',
      username:'',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:'female'
    }
  })




  async function handleRegister(data:RegisterSchema)
  {
    setLoading(true)
    try {
       const res = await signUp(data);
       console.log(res);
       if (res?.success) {
        navigate('/login')
        toast.success(res?.message)
       }
       
    } catch (error:any) {
      toast.error(error.response.message);
      
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="flex max-w-md flex-col gap-4 mx-auto my-10">
      <div>
        <TextInput
        {...register('name')}
          id="Fullname"
          type="text"
          placeholder="Full name"
          icon={IoPersonCircleSharp }
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
      {errors?.name && <span className="text-rose-600"> {errors?.name.message}</span>}
      </div>
       <div>
        <TextInput
        {...register("username")}
          id="username"
          type="text"
          placeholder="Username"
          icon={IoPersonCircleSharp }
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
         {errors?.username && <span className="text-rose-600"> {errors?.username.message}</span>}
      </div>
       <div>
        <TextInput
        {...register('email')}
          id="email"
          type="email"
          placeholder="Email address"
          icon={MdAlternateEmail}
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
        {errors?.email && <span className="text-rose-600"> {errors?.email.message}</span>}
      </div>
       <div>
         
        <TextInput
        {...register('dateOfBirth')}
          id="dateOfBirth"
          type="date"
          icon={SlCalender}
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
        {errors?.dateOfBirth && <span className="text-rose-600"> {errors?.dateOfBirth.message}</span>}
      </div>
       
        <Select 
        {...register('gender')}
        id="gender" 
        icon={FaPerson}
         theme={{
              field: {
              select: {
                  colors: {
                    gray: "!bg-slate-50 !text-gray-900",
                  },
                },
              },
            }}
        >
        <option value="female">Female </option>
        <option value="male">Male</option>
      </Select>
       {errors?.gender && <span className="text-rose-600"> {errors?.gender.message}</span>}
      <div>
        <TextInput
        {...register('password')}
         id="password1" 
         type="password" 
         placeholder="Password" 
         icon={RiLockPasswordLine}
          theme={{
              field: {
                input: {
                  colors: {
                    gray: "!bg-slate-50 !text-gray-900",
                  },
                },
              },
            }} />
         {errors?.password && <span className="text-rose-600"> {errors?.password.message}</span>}
      </div>

      <div>
        <TextInput
        {...register('rePassword')}
         id="password2"
          type="password" 
          placeholder="Confirm password" 
           icon={RiLockPasswordLine}
            theme={{
              field: {
                input: {
                  colors: {
                    gray: "!bg-slate-50 !text-gray-900",
                  },
                },
              },
            }}/>
           {errors?.rePassword && <span className="text-rose-600"> {errors?.rePassword.message}</span>}
      </div>
      <Button 
      disabled = {isLoading}
      type="submit" color="none" className=" rounded-xl py-3 w-full text-base font-extrabold text-white cursor-pointer transition disabled:opacity-60 bg-[#910767] hover:bg-[#620446]">
        {isLoading?<ImSpinner></ImSpinner>:'Register'}
        </Button>
    </form>
  );
}
