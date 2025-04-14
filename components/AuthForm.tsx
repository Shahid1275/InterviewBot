"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import { Button } from "./ui/button"
import { toast } from "sonner"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

type FormType = "sign-in" | "sign-up"
 
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
       toast.success("account created successfuly Please sign-in")
       router.push("/sign-in")
      } else {
        toast.success("sign-in successfuly")
        router.push("/")
      }
    } catch (error) {
      console.log(error)
      toast.error(`There was an error ${error}`)
    }
  }

  const isSignIn = type === "sign-in"

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="card flex flex-col gap-4 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.png" width={198} height={198} alt="logo" />
          {/* <h2 className="text-primary-100">PrepAce</h2> */}
        </div>
        <h3 className="text-2xl text-center">Practice job interview with AI</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field}  className="rounded-full px-2 py-5 border-2 
                    transition-all duration-200 hover:border-gray-300"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl >
                    <Input placeholder="Your Email Address" type="email" {...field}  className="rounded-full px-2 py-5 border-2 
                    transition-all duration-200 hover:border-gray-300"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="  Enter Your Password" type="password" {...field} className="rounded-full px-2 py-5 border-2 
                    transition-all duration-200 hover:border-gray-300"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
          </form>
        </Form>
        
        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link 
            href={isSignIn ? "/sign-up" : "/sign-in"} 
            className="text-primary underline-offset-4 hover:underline"
          >
            {isSignIn ? "Create an account" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm