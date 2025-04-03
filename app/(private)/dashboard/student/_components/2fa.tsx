"use client";

import type React from "react";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { enable2FA, verify2FA } from "../_actions/user";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import QRCode from "react-qr-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [otpAuthUrl, setOtpAuthUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState({
    toggle: false,
    verify: false,
  });
  const [error, setError] = useState("");

  const handle2FAToggle = async (checked: boolean) => {
    setIsLoading((prev) => ({ ...prev, toggle: true }));
    setError("");

    try {
      if (checked) {
        const data = await enable2FA();
        if (!data?.qr_code_url || !data?.secret) {
          throw new Error("Invalid response from server");
        }
        setOtpAuthUrl(data.qr_code_url);
        setSecret(data.secret);
        setShowDialog(true);
      } else {
        setIs2FAEnabled(false);
        toast({
          title: "Two-factor authentication disabled",
          description: "Your account is now using password-only authentication",
          variant: "default",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Setup failed",
        description:
          error instanceof Error ? error.message : "Failed to setup 2FA",
        variant: "destructive",
      });
      setIs2FAEnabled(false);
    } finally {
      setIsLoading((prev) => ({ ...prev, toggle: false }));
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, verify: true }));
    setError("");

    try {
      if (otpCode.length !== 6) {
        throw new Error("Verification code must be 6 digits");
      }

      await verify2FA(secret, otpCode);
      setIs2FAEnabled(true);
      setShowDialog(false);
      setOtpCode("");
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now protected with 2FA",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "Invalid verification code"
      );
      setIs2FAEnabled(false);
    } finally {
      setIsLoading((prev) => ({ ...prev, verify: false }));
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setIs2FAEnabled(false);
    setOtpCode("");
    setError("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>
            Add an extra layer of security to your account by requiring a
            verification code in addition to your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Switch
                id="2fa"
                checked={is2FAEnabled}
                onCheckedChange={handle2FAToggle}
                disabled={isLoading.toggle}
                aria-label={
                  is2FAEnabled
                    ? "Disable two-factor authentication"
                    : "Enable two-factor authentication"
                }
              />
              <Label htmlFor="2fa" className="font-medium">
                {is2FAEnabled
                  ? "Two-Factor Authentication is enabled"
                  : "Enable Two-Factor Authentication"}
              </Label>
            </div>
            {isLoading.toggle && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>

          {is2FAEnabled && (
            <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Protected</AlertTitle>
              <AlertDescription>
                Your account is protected with two-factor authentication.
                You&apos;ll need to enter a verification code from your
                authenticator app when signing in.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          {is2FAEnabled
            ? "We recommend saving backup codes in a secure location in case you lose access to your authenticator app."
            : "Two-factor authentication adds an additional layer of security by requiring access to your phone as well as your password."}
        </CardFooter>
      </Card>

      <Dialog
        open={showDialog}
        onOpenChange={(open) => !open && handleDialogClose()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Set up Two-Factor Authentication
            </DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app (like Google
              Authenticator, Authy, or Microsoft Authenticator) and enter the
              6-digit verification code below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="border rounded-md p-4 bg-white mb-4 flex flex-col items-center">
              {otpAuthUrl ? (
                <div className="p-2 bg-white">
                  <QRCode
                    value={otpAuthUrl}
                    size={200}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              ) : (
                <div className="h-[200px] w-[200px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
            </div>

            <form onSubmit={handleVerifyOTP} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">
                  Enter verification code from your app
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={(value) => {
                      setOtpCode(value);
                      setError("");
                    }}
                    aria-label="Enter 6-digit verification code"
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
                {error && (
                  <div className="flex items-center justify-center gap-2 text-sm text-red-500 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <p>{error}</p>
                  </div>
                )}
              </div>
              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                  disabled={isLoading.verify}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={otpCode.length !== 6 || isLoading.verify}
                >
                  {isLoading.verify ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify and Enable"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
