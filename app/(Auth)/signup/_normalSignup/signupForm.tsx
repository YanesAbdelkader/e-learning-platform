import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
} from "lucide-react"; // Added Eye and EyeOff icons
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
import { useActionState, useCallback, useEffect, useState } from "react";
import {
  sendVerificationCode,
  verifyEmail,
  signupAction,
} from "../_actions/actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageCropper from "@/components/image-cropper";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const schema = z
  .object({
    name: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    verificationCode: z
      .string()
      .min(6, "Verification code must be 6 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    picture: z.string().min(1, "Profile picture is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof schema>;

const steps = [
  { title: "Account Details", fields: ["name", "lastName"] },
  { title: "Email", fields: ["email"] },
  { title: "Send Verification Code", fields: [] }, // Step to send the code
  { title: "Verify Code", fields: ["verificationCode"] }, // Step to verify the code
  { title: "Password", fields: ["password", "confirmPassword"] },
  { title: "Profile Picture", fields: ["picture"] },
  { title: "Confirm Details", fields: [] },
];

export default function SignupForm() {
  const { toast } = useToast();
  const [stats, , isPending] = useActionState(signupAction, null);
  const [step, setStep] = useState(0);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false); // Track if the code has been sent
  const [isCodeVerified, setIsCodeVerified] = useState(false); // Track if the code is verified
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      verificationCode: "",
      password: "",
      confirmPassword: "",
      picture: "",
    },
  });

  const nextStep = () => {
    const fieldsToValidate = steps[step].fields as (keyof FormData)[];
    form.trigger(fieldsToValidate).then((isValid) => {
      if (isValid) setStep((prev) => Math.min(prev + 1, steps.length - 1));
    });
  };

  const prevStep = () => {
    if (step === 4) {
      setIsCodeVerified(false); // Reset verification status if going back from password step
    }
    setStep((prev) => Math.max(prev - 1, 0));
  };

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
      form.setValue("picture", croppedImage);
      setCropDialogOpen(false);
    },
    [form]
  );

  const handleSendVerificationCode = async () => {
    const email = form.getValues("email");
    const response = await sendVerificationCode(null, email);
    if (response?.success) {
      setIsCodeSent(true);
      toast({
        title: "Verification Code Sent",
        description: "A verification code has been sent to your email.",
      });
    } else {
      toast({
        title: "Error",
        description: response?.error || "Failed to send verification code.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyCode = async () => {
    // Validate the verificationCode field
    const isValid = await form.trigger("verificationCode");
    if (!isValid) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    const email = form.getValues("email");
    const code = form.getValues("verificationCode");
    const response = await verifyEmail(null, email, code);

    if (response.success) {
      setIsCodeVerified(true); // Mark code as verified
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      });
      nextStep(); // Move to the next step
    } else {
      toast({
        title: "Error",
        description: response.message || "Failed to verify the code.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    // Exclude verificationCode from the form data
    const { verificationCode, ...formDataWithoutCode } = data;

    // Convert the data to FormData
    const formData = new FormData();
    Object.entries(formDataWithoutCode).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call the signupAction with the modified data
    const result = await signupAction(null, formData);

    if (result?.title === "Registration success!!") {
      toast({ title: result.title, description: result.description });
      redirect(`${result.path}`);
    } else {
      toast({
        title: result?.title || "Error",
        description: result?.description || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

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
                    formData.picture || "/placeholder.svg?height=128&width=128"
                  }
                  alt="Profile picture"
                />
                <AvatarFallback>
                  {formData.name.charAt(0)}
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
                  <p className="text-base font-medium">{formData.name}</p>
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

  useEffect(() => {
    if (stats?.title) {
      toast({
        title: stats.title,
        description: stats.description,
        variant: stats.variant === "destructive" ? "destructive" : "default",
      });
    }
  }, [stats, toast]);

  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-100">
          Step {step + 1} of {steps.length}: {steps[step].title}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {step === 0 && (
            <>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
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
            <div className="flex flex-col items-center space-y-4">
              <Button
                type="button"
                onClick={handleSendVerificationCode}
                disabled={isCodeSent || isPending}
                className=" bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isCodeSent ? "Code Sent" : "Send Verification Code"}
              </Button>
              {isCodeSent && (
                <p className="text-sm text-muted-foreground">
                  A verification code has been sent to your email.
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the 6-digit code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={handleVerifyCode}
                className="ml-auto bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Verify Code
              </Button>
            </>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-100" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-100" />
                          )}
                        </button>
                      </div>
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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-100" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-100" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 5 && (
            <FormField
              control={form.control}
              name="picture"
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
                          {form.getValues("name").charAt(0)}
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

          {step === 6 && renderConfirmationStep()}

          <div className="flex justify-between">
            {step > 0 && (
              <Button type="button" onClick={prevStep} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={step === 3 ? handleVerifyCode : nextStep}
                className="ml-auto bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={step === 3 && !isCodeVerified} // Only disable if not on step 3 and pending
              >
                {"Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => form.handleSubmit(onSubmit)()}
                className="ml-auto bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Create Account
              </Button>
            )}
          </div>
        </form>
      </Form>
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
    </>
  );
}
