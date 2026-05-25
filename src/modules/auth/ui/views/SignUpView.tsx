"use client";
import { registerSchema } from "@/modules/schemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { trpc } from "@/modules/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export function SignUpView() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "all",
  });
  const router = useRouter();

  const registerMutation = trpc.auth.register.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(res) {
      toast.success("Account created successfully!");
      router.push("/");
    },
  });
  async function onSubmit(data: z.infer<typeof registerSchema>) {
    await registerMutation.mutateAsync(data);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-background h-screen w-full lg:col-span-3 overflow-y-auto">
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 p-4 lg:p-16" /* Check the look if "gap-8" is neccessary*/
        >
          <Field orientation="horizontal" className="justify-between">
            <Link href="/">
              <span className={cn("text-2xl font-semibold", poppins.className)}>
                LogoIpsum
              </span>
            </Link>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-base border-none underline"
            >
              <Link prefetch href="/sign-in">
                Sign In
              </Link>
            </Button>
          </Field>
          <Field>
            <h1 className="text-4xl font-medium">
              Join Over 1.5million creators earning money on LogoIpsum
            </h1>
          </Field>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">E-mail</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Choose a username"
                    autoComplete="off"
                    type="text"
                  />
                  <FieldDescription
                    className={cn(
                      "hidden",
                      !fieldState.invalid && field.value !== "" && "block",
                    )}
                  >
                    Your store will be available at&nbsp;https://
                    <strong>{field.value}</strong>.logoipsum.com
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="form-rhf-demo"
              disabled={registerMutation.isPending}
            >
              Submit
            </Button>
          </Field>
        </form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
