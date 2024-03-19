"use client"
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import {
    Form,
} from "@/components/ui/form"
import { 
    IconMailFilled,
    IconLockSquareRoundedFilled, 
} from '@tabler/icons-react';
import { useSignInForm } from "../../../hooks/forms/use_sign_in_form";
import { routes } from "../../../constants/route";
import MyFormField from "@/components/my_ui/my_form_field";
import MyButton from "@/components/my_ui/my_button";


export default function SignInForm() {
    const {form, onSubmit} = useSignInForm();

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                    {/* email */}
                    <MyFormField
                        form={form} 
                        value="email" 
                        placeholder="Email"
                        icon={<IconMailFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* password */}
                    <MyFormField 
                        form={form} 
                        value="password" 
                        placeholder="Password" 
                        type="password"
                        icon={<IconLockSquareRoundedFilled className="absolute w-12 h-[40px] p-2 m-1 bg-gradient-to-l from-white from-70% to-transparent right-0 top-0 text-[#9F9F9F] rounded-tr-md rounded-br-md" />}
                    />
                    {/* forgot password ? */}
                    <div className=" flex justify-between item-center w-full h-fit">
                        <Link href={routes.FORGOT_PASSWORD} className=" text-blue-500 text-xs font-medium hover:underline">forgot password ?</Link>
                        <div className="text-neutral-400 text-xs font-medium">don’t have an account ? <Link href={`${routes.SIGN_UP}`} className="text-blue-500 text-xs font-medium hover:underline">Sign up</Link></div>
                    </div>
                    {/* gap */}
                    <div className="h-1"/>
                    {/* submit button */}
                    <MyButton text="Sign in"/>
                </form>
            </Form>
    )
}