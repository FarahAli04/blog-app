import * as zod from 'zod'


export const loginSchema = zod.object({
     email:zod.string().nonempty('this field is required').email('Email is not valid !!'),
        password:zod.string().nonempty("this field is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
})

export type loginSchemaType = zod.infer<typeof loginSchema>