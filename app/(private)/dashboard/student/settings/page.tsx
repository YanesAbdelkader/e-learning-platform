"use client";

import type React from "react";

import { useState, useRef, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { getCookie } from "typescript-cookie";
import { updateUserProfile } from "../_actions/user";
import { toast } from "@/hooks/use-toast";
import ImageCropper from "../_components/image-cropper";
import EmailVerificationDialog from "../_components/email-verification-dialog";

export default function SettingsPage() {
  const picture = getCookie("picture") || "";
  const name = getCookie("name") || "";
  const lastname = getCookie("lastname") || "";
  const email = getCookie("email") || "";

  // Form state
  const [firstName, setFirstName] = useState(name);
  const [lastName, setLastName] = useState(lastname);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [newEmail, setNewEmail] = useState(email);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    picture ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${picture}` : null
  );
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImageUrl(event.target?.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImage = (croppedImage: string) => {
    setBase64Image(croppedImage);
    setProfilePicture(croppedImage);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", firstName);
      formData.append("lastname", lastName);
      if (newEmail !== currentEmail) {
        formData.append("email", newEmail);
        setShowEmailVerification(true);
        setIsSubmitting(false);
        return;
      }
      if (base64Image) {
        formData.append("picture", base64Image);
      }

      const result = await updateUserProfile(formData);

      if (result?.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result?.message || "Failed to update profile",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailVerificationSuccess = () => {
    setCurrentEmail(newEmail);
    toast({
      title: "Success",
      description: "Email updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and how others see you on the
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-40 w-40">
                      <AvatarImage
                        src={profilePicture || ""}
                        alt={`${firstName} ${lastName}`}
                      />
                      <AvatarFallback className="text-2xl">
                        {firstName && lastName
                          ? `${firstName[0]}${lastName[0]}`
                          : "JD"}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                      />
                      {newEmail !== currentEmail && (
                        <p className="text-sm text-muted-foreground mt-1">
                          You&apos;ll need to verify this email address before
                          the change takes effect.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Image Cropper Dialog */}
      {showCropper && tempImageUrl && (
        <ImageCropper
          open={showCropper}
          onClose={() => setShowCropper(false)}
          onCropComplete={handleCroppedImage}
          imageUrl={tempImageUrl}
        />
      )}

      {/* Email Verification Dialog */}
      {showEmailVerification && (
        <EmailVerificationDialog
          open={showEmailVerification}
          onClose={() => setShowEmailVerification(false)}
          email={newEmail}
          onSuccess={handleEmailVerificationSuccess}
        />
      )}
    </div>
  );
}
