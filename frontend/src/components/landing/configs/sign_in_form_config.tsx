import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export function useSignInForm() {
    // form schema
    const signInFormSchema = z.object({
        email: z.string().min(2).max(50),
        password: z.string().min(2).max(50),
    })
    
    // main form config
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    // handle Submit
    function onSubmit(values: z.infer<typeof signInFormSchema>, ) {
        console.log(values)
    }

    return {
        signInFormSchema,
        form,
        onSubmit
    }
}