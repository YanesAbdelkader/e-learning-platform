"use client";

import { FormEvent, useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import { updateUserProfile } from "../_actions/user";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageCropper from "./image-cropper";
import EmailVerificationDialog from "./email-verification-dialog";

export default function ProfileInfo() {
  // Initialize state from cookies
  const initialPicture = getCookie("picture") || "";
  const initialName = getCookie("name") || "";
  const initialLastname = getCookie("lastname") || "";
  const initialEmail = getCookie("email") || "";

  // Form state
  const [formData, setFormData] = useState({
    firstName: initialName,
    lastName: initialLastname,
    email: initialEmail,
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(
    initialPicture
      ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${initialPicture}`
      : null
  );
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setTempImageUrl(event.target?.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCroppedImage = (croppedImage: string) => {
    setBase64Image(croppedImage);
    setProfilePicture(croppedImage);
    setShowCropper(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const formDataObj = new FormData();
      formDataObj.append("name", formData.firstName);
      formDataObj.append("lastname", formData.lastName);

      if (formData.email !== initialEmail) {
        formDataObj.append("email", formData.email);
        setShowEmailVerification(true);
        return;
      }

      if (base64Image) {
        formDataObj.append("picture", base64Image);
      }

      const result = await updateUserProfile(formDataObj);

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
      console.error(error);
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
    toast({
      title: "Success",
      description: "Email updated successfully",
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <>
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
                <Avatar className="h-40 w-40 relative group">
                  <AvatarImage
                    src={profilePicture || ""}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {formData.firstName && formData.lastName
                      ? `${formData.firstName[0]}${formData.lastName[0]}`
                      : "JD"}
                  </AvatarFallback>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
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
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                  {formData.email !== initialEmail && (
                    <p className="text-sm text-muted-foreground mt-1">
                      You&apos;ll need to verify this email address before the
                      change takes effect.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {showCropper && tempImageUrl && (
        <ImageCropper
          open={showCropper}
          onClose={() => setShowCropper(false)}
          onCropComplete={handleCroppedImage}
          imageUrl={tempImageUrl}
        />
      )}

      {showEmailVerification && (
        <EmailVerificationDialog
          open={showEmailVerification}
          onClose={() => setShowEmailVerification(false)}
          email={formData.email}
          onSuccess={handleEmailVerificationSuccess}
        />
      )}
    </>
  );
}
