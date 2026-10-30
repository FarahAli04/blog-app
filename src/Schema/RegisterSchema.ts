  import * as zod from "zod"
  
  // schema
  export const RegisterSchemaObj =  zod.object({
    name:zod.string().nonempty('this field is required').min(2,'min name is 2 letters').max(15,'max name is 15 letters'),
    username:zod.string().min(2,'min username is 2 letters').max(15,'max username is 15 letters'),
    email:zod.string().nonempty('this field is required').email('Email is not valid !!'),
    password:zod.string().nonempty("this field is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    rePassword:zod.string().nonempty("this field is required"),
    dateOfBirth:zod.string().nonempty("this field is required").refine((data)=>{
      const myYear = new Date(data).getFullYear()
       const thisYear = new Date().getFullYear()
       return thisYear - myYear > 10
    },{
      message:'age has to be > 10'
    }
  ),
  gender:zod.enum(['female','male']),

  }).refine((data)=>{
    return data.password === data.rePassword ;
  },{
    message:'Passwords dont match',
    path:['rePassword']
  })

 export type RegisterSchema = zod.infer<typeof RegisterSchemaObj>