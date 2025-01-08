"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Divider } from "@/components/divider";
import ImageCropper from "@/components/image-cropper";
import { Github, Facebook, Instagram, Chrome } from "lucide-react";

const schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    profilePicture: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const steps = [
  { title: "Account Details", fields: ["firstName", "lastName"] },
  { title: "Email", fields: ["email"] },
  { title: "Password", fields: ["password", "confirmPassword"] },
  { title: "Profile Picture", fields: ["profilePicture"] },
  { title: "Confirm Details", fields: [] },
];

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Implement your registration logic here
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsLoading(false);
  };

  const handleSocialSignUp = async (provider: string) => {
    setIsLoading(true);
    // Implement your social sign-up logic here
    console.log(`Signing up with ${provider}`);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsLoading(false);
  };

  const nextStep = () => {
    const fieldsToValidate = steps[step].fields as (keyof FormData)[];
    form.trigger(fieldsToValidate).then((isValid) => {
      if (isValid) setStep((prev) => Math.min(prev + 1, steps.length - 1));
    });
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImage = useCallback(
    (croppedImage: string) => {
      form.setValue("profilePicture", croppedImage);
      setCropDialogOpen(false);
    },
    [form]
  );

  const renderConfirmationStep = () => {
    const formData = form.getValues();
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={
                    formData.profilePicture ||
                    "/placeholder.svg?height=128&width=128"
                  }
                  alt="Profile picture"
                />
                <AvatarFallback>
                  {formData.firstName.charAt(0)}
                  {formData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    First Name
                  </Label>
                  <p className="text-base font-medium">{formData.firstName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Last Name
                  </Label>
                  <p className="text-base font-medium">{formData.lastName}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="text-base font-medium">{formData.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground">
                  Password
                </Label>
                <div className="flex items-center gap-1 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">
                    Password requirements met
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-center text-muted-foreground">
                Please verify that all the information above is correct before
                proceeding. You can go back to any step to make corrections if
                needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step {step + 1} of {steps.length}: {steps[step].title}
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            {step === 0 && (
              <>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="your first name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="your last name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Divider>Or sign up with</Divider>

                <div className="grid grid-cols-4 gap-3">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("facebook")}
                        disabled={isLoading}
                        className="w-full"
                      >
                        <Facebook className="h-8 w-8" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Sign up with Facebook
                          </h4>
                          <p className="text-sm">
                            Use your Facebook account for a quick registration
                            process.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("instagram")}
                        disabled={isLoading}
                        className="w-full"
                      >
                        <Instagram className="h-8 w-8" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Sign up with Instagram
                          </h4>
                          <p className="text-sm">
                            Connect your Instagram account to create an account
                            on our platform.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("google")}
                        disabled={isLoading}
                        className="w-full"
                      >
                        <Chrome className="h-8 w-8" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Sign up with Google
                          </h4>
                          <p className="text-sm">
                            Use your Google account to quickly create an account
                            on our platform.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("github")}
                        disabled={isLoading}
                        className="w-full"
                      >
                        <Github className="h-8 w-8" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Sign up with GitHub
                          </h4>
                          <p className="text-sm">
                            Use your GitHub account to create an account on our
                            platform.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </>
            )}

            {step === 1 && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-32 h-32">
                          <AvatarImage
                            src={
                              field.value ||
                              "/placeholder.svg?height=128&width=128"
                            }
                            alt="Profile picture"
                          />
                          <AvatarFallback>
                            {form.getValues("firstName").charAt(0)}
                            {form.getValues("lastName").charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 4 && renderConfirmationStep()}

            <div className="flex justify-between">
              {step > 0 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crop Profile Picture</DialogTitle>
          </DialogHeader>
          {imageSrc && (
            <ImageCropper
              imageSrc={imageSrc}
              onCropFinish={handleCroppedImage}
              aspect={1}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
