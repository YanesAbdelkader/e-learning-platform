"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { otpAction } from "../_actions/actions";
import { useToast } from "@/hooks/use-toast";

export type OTPFormData = z.infer<typeof otpSchema>;
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function OtpForm() {
  const { toast } = useToast();
  const [message, action, isPending] = useActionState(otpAction, null);
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  useEffect(() => {
    if (message) {
      toast({
        title: message.title,
        description: message.description,
        variant:
          message.variant === "destructive"
            ? "destructive"
            : message.variant === null
            ? "default"
            : null,
      });
    }
  }, [message, toast]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(action)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mb-6 flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </Form>
  );
}
