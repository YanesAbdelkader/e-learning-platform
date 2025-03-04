"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailVerification } from "./steps/email-verification";
import { PersonalInfo } from "./steps/personal-info";
import { ContactInfo } from "./steps/contact-info";
import { EducationCertifications } from "./steps/education-certifications";
import { AdditionalInfo } from "./steps/additional-info";
import {
  sendVerificationCode,
  verifyEmail,
  registerTeacher,
} from "../actions/auth";
import { useToast } from "@/hooks/use-toast";

const steps = [
  "Email Verification",
  "Personal Information",
  "Contact Information",
  "Education & Certifications",
  "Additional Information",
];

export function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    contactInfo: "",
    subjects: [],
    certifications: [],
    education: [],
    links: [],
    bio: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObject = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formDataObject.append(key, JSON.stringify(value)); // Convert arrays to JSON string
      } else {
        formDataObject.append(key, value);
      }
    });

    const result = (await registerTeacher(null, formDataObject)) || {
      success: false,
      error: "Unknown error occurred",
    };

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Registration successful",
        description: result.message,
      });
      router.push("/dashboard/teacher");
    } else {
      toast({
        title: "Registration failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData };
    switch (currentStep) {
      case 0:
        return (
          <EmailVerification
            email={formData.email}
            updateFormData={updateFormData}
            setIsEmailVerified={setIsEmailVerified}
            sendVerificationCode={sendVerificationCode}
            verifyEmail={verifyEmail}
          />
        );
      case 1:
        return <PersonalInfo {...stepProps} />;
      case 2:
        return <ContactInfo {...stepProps} />;
      case 3:
        return <EducationCertifications {...stepProps} />;
      case 4:
        return <AdditionalInfo {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full mx-auto border-none">
      <CardHeader>
        <CardTitle>{steps[currentStep]}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-full h-2 ${
                  index <= currentStep
                    ? "bg-primary"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            {steps.map((_, index) => (
              <span
                key={index}
                className={index <= currentStep ? "text-primary" : ""}
              >
                Step {index + 1}
              </span>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>{renderStep()}</form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          type={currentStep === steps.length - 1 ? "submit" : "button"}
          onClick={currentStep === steps.length - 1 ? undefined : handleNext}
          disabled={isSubmitting || (currentStep === 0 && !isEmailVerified)}
        >
          {currentStep === steps.length - 1
            ? isSubmitting
              ? "Submitting..."
              : "Submit"
            : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
