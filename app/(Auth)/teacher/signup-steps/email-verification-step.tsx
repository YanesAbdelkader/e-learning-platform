"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormState, StepProps } from "../_components/signup-types";
import { sendVerificationCode, verifyEmail } from "../_actions/actions";

const initialEmailState = { success: false, error: "", message: "" };
const initialVerifyState = { success: false, error: "", message: "" };

export default function EmailVerificationStep({
  formData,
  updateFormData,
  onStepComplete,
}: StepProps & { onStepComplete: () => void }) {
  const [emailState, setEmailState] = useState<FormState>(initialEmailState);
  const [verifyState, setVerifyState] = useState<FormState>(initialVerifyState);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyFormRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    const submitFormData = new FormData();
    submitFormData.append("email", formData.email);

    toast({
      title: "Sending verification code",
      description:
        "Please wait while we send a verification code to your email.",
    });

    try {
      const result = await sendVerificationCode(null, submitFormData);
      if (result) {
        setEmailState(result);
        setVerificationSent(true);

        if (result.success) {
          toast({
            title: "Verification code sent",
            description: "Please check your email for the verification code.",
          });
        } else if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyEmail = async () => {
    setIsVerifying(true);

    const submitFormData = new FormData();
    submitFormData.append("email", formData.email);
    submitFormData.append("code", verificationCode);

    toast({
      title: "Verifying email",
      description: "Please wait while we verify your email.",
    });

    try {
      const result = await verifyEmail(null, submitFormData);
      if (result) {
        setVerifyState(result);

        if (result.success) {
          updateFormData({ emailVerified: true });
          toast({
            title: "Email verified",
            description: "Your email has been successfully verified.",
          });
          onStepComplete(); // Call this to advance to the next step
        } else if (result.error) {
          toast({
            title: "Verification failed",
            description: result.error,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          disabled={verificationSent && !formData.emailVerified}
          required
        />
      </div>

      {!verificationSent ? (
        <Button
          type="button"
          className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSendCode}
          disabled={!formData.email}
        >
          Send Verification Code
        </Button>
      ) : !formData.emailVerified ? (
        <form ref={verifyFormRef} >
          <input type="hidden" name="email" value={formData.email} />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                name="code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            {emailState.success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{emailState.message}</AlertDescription>
              </Alert>
            )}

            {emailState.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{emailState.error}</AlertDescription>
              </Alert>
            )}

            {verifyState.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{verifyState.error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                variant="outline"
                onClick={() => {
                  setVerificationSent(false);
                  setVerificationCode("");
                }}
              >
                Change Email
              </Button>
              <Button className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" disabled={isVerifying} onClick={()=>handleVerifyEmail()}>
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Email verified successfully!</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
