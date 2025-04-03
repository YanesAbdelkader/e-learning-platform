"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { otpAction } from "../_actions/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;

const otpSchema = z.object({
  otp: z
    .string()
    .min(OTP_LENGTH, {
      message: `Please enter all ${OTP_LENGTH} digits`,
    })
    .max(OTP_LENGTH)
    .refine((val) => /^\d+$/.test(val), {
      message: "OTP must contain only numbers",
    }),
});

export type OTPFormData = z.infer<typeof otpSchema>;

export default function OtpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: OTPFormData) => {
    setIsSubmitting(true);
    try {
      const result = await otpAction(data);
      toast({
        title: result.title,
        description: result.description,
        variant: result.variant === "destructive" ? "destructive" : "default",
      });

      if (result?.path) {
        form.reset();
        router.push(result.path);
      }
    } catch (error) {
      console.log("OTP verification error:", error);
      toast({
        title: "Verification Failed",
        description: "We couldn't verify your code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    isSubmitting || !form.formState.isDirty || !!form.formState.errors.otp;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormLabel className="text-center block mb-2">
                Enter verification code
              </FormLabel>
              <FormControl>
                <div className="flex justify-center" aria-live="polite">
                  <InputOTP maxLength={OTP_LENGTH} {...field} autoFocus>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        aria-label="Digit 1 of verification code"
                      />
                      <InputOTPSlot
                        index={1}
                        aria-label="Digit 2 of verification code"
                      />
                      <InputOTPSlot
                        index={2}
                        aria-label="Digit 3 of verification code"
                      />
                      <InputOTPSlot
                        index={3}
                        aria-label="Digit 4 of verification code"
                      />
                      <InputOTPSlot
                        index={4}
                        aria-label="Digit 5 of verification code"
                      />
                      <InputOTPSlot
                        index={5}
                        aria-label="Digit 6 of verification code"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage className="text-center mt-2" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isDisabled}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
      </form>
    </Form>
  );
}
