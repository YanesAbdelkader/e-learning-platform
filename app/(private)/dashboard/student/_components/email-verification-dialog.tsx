"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendVerificationEmail, verifyEmailAndUpdate } from "../_actions/user";
import { toast } from "@/hooks/use-toast";

interface EmailVerificationDialogProps {
  open: boolean;
  onClose: () => void;
  email: string;
  onSuccess: () => void;
}

export default function EmailVerificationDialog({
  open,
  onClose,
  email,
  onSuccess,
}: EmailVerificationDialogProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleSendCode = async () => {
    try {
      setIsSendingCode(true);
      const result = await sendVerificationEmail(email);
      if (result?.success) {
        setIsCodeSent(true);
        toast({
          title: "Verification code sent",
          description: "Please check your email for the verification code",
        });
      } else {
        toast({
          title: "Error",
          description: result?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to send verification code",
        variant: "destructive",
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsVerifying(true);
      const result = await verifyEmailAndUpdate(verificationCode, email);
      if (result.success) {
        toast({
          title: "Success",
          description: "Email verified successfully",
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to verify code",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!isCodeSent ? (
            <div className="space-y-2">
              <p>
                We need to verify your new email address:{" "}
                <strong>{email}</strong>
              </p>
              <p>
                Click the button below to send a verification code to this
                email.
              </p>
              <Button
                onClick={handleSendCode}
                className="w-full mt-2"
                disabled={isSendingCode}
              >
                {isSendingCode ? "Sending..." : "Send Verification Code"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                Enter the 6-digit verification code sent to{" "}
                <strong>{email}</strong>
              </p>
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {isCodeSent && (
            <Button
              onClick={handleVerifyCode}
              disabled={verificationCode.length !== 6 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
