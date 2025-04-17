"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  signIn as serverSignIn,
  signUp as serverSignUp,
} from "@/lib/actions/auth.action";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { useState } from "react";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleAuthError = (error: any) => {
    let errorMessage = "An error occurred. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already in use. Please sign in.";
        break;
      case "auth/user-not-found":
        errorMessage = "No account found. Please sign up.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many attempts. Please try again later.";
        break;
      case "auth/invalid-credential":
        errorMessage =
          "Invalid credentials. Please check your email and password.";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    toast.error(errorMessage);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await serverSignUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
        });

        if (!result.success) {
          throw new Error(result.message);
        }

        toast.success("Account created successfully! Redirecting to login...");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          throw new Error("Authentication failed - no token received");
        }

        const result = await serverSignIn({ email, idToken });

        if (result.success) {
          toast.success("Welcome back! Redirecting...");
          window.location.href = "/";
        } else {
          throw new Error(result.message || "Authentication failed");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="card flex flex-col gap-4 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.png" width={198} height={198} alt="logo" />
        </div>
        <h3 className="text-2xl text-center">Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        disabled={isLoading}
                        className="rounded-full px-2 py-5 border-2 transition-all duration-200 hover:border-gray-300"
                      />
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
                  <FormControl>
                    <Input
                      placeholder="Your Email Address"
                      type="email"
                      {...field}
                      disabled={isLoading}
                      className="rounded-full px-2 py-5 border-2 transition-all duration-200 hover:border-gray-300"
                    />
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
                    <Input
                      placeholder="Enter Your Password"
                      type="password"
                      {...field}
                      disabled={isLoading}
                      className="rounded-full px-2 py-5 border-2 transition-all duration-200 hover:border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  {isSignIn ? "Signing in..." : "Creating account..."}
                </span>
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Create an account"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-primary underline-offset-4 hover:underline"
            onClick={(e) => isLoading && e.preventDefault()}
          >
            {isSignIn ? "Create an account" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default AuthForm;
