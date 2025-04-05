"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import FormStepper from "./form-stepper";
import { useToast } from "@/hooks/use-toast";
import { registerTeacher } from "../_actions/actions";
import { TeacherFormData } from "./signup-types";
import EmailVerificationStep from "../signup-steps/email-verification-step";
import PersonalInfoStep from "../signup-steps/personal-info-step";
import ProfilePictureStep from "../signup-steps/profile-picture-step";
import ProfessionalInfoStep from "../signup-steps/professional-info-step";
import AdditionalInfoStep from "../signup-steps/additional-info-step";

// Initial states for form steps
const initialRegisterState = { success: false, error: "", message: "" };

export default function TeacherSignupForm() {
  // Form states
  const [currentStep, setCurrentStep] = useState(0);
  const [registerState, setRegisterState] = useState(initialRegisterState);

  // Form data states
  const [formData, setFormData] = useState<TeacherFormData>({
    email: "",
    emailVerified: false,
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    contactInfo: "",
    picture: "",
    subjects: [],
    certifications: [],
    education: [],
    links: [],
    bio: "",
  });

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation states
  const [passwordError, setPasswordError] = useState("");

  // Refs
  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  // Update form data
  const updateFormData = useCallback((updates: Partial<TeacherFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  // Handle step completion
  const handleStepComplete = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  // Steps configuration
  const steps = [
    { title: "Email Verification", completed: formData.emailVerified },
    {
      title: "Personal Information",
      completed:
        !!formData.name &&
        !!formData.lastname &&
        !!formData.password &&
        !!formData.confirmPassword &&
        !passwordError,
    },
    { title: "Profile Picture", completed: !!formData.picture },
    {
      title: "Professional Information",
      completed: formData.subjects.length > 0 && formData.education.length > 0,
    },
    {
      title: "Additional Information",
      completed: !!formData.bio && !!formData.contactInfo,
    },
  ];

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    toast({
      title: "Submitting registration",
      description: "Please wait while we process your registration.",
    });

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name);
    submitFormData.append("lastname", formData.lastname);
    submitFormData.append("email", formData.email);
    submitFormData.append("password", formData.password);
    submitFormData.append("picture", formData.picture);
    submitFormData.append("contactInfo", formData.contactInfo);

    // Append each subject individually
    formData.subjects.forEach((subject) => {
      submitFormData.append("subjects[]", subject);
    });

    // Append each certification individually
    formData.certifications.forEach((certification) => {
      submitFormData.append("certifications[]", certification);
    });

    // Append education as a string
    submitFormData.append("education", JSON.stringify(formData.education));

    // Append each link individually (ensure URLs include a protocol)
    formData.links.forEach((link) => {
      const validLink =
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `http://${link}`;
      submitFormData.append("links[]", validLink);
    });

    submitFormData.append("bio", formData.bio);

    try {
      const result = await registerTeacher(submitFormData);
      if (result) {
        setRegisterState(result);

        if (result.success) {
          toast({
            title: "Registration successful",
            description: "Your teacher account has been successfully created.",
          });
        } else if (result.error) {
          toast({
            title: "Registration failed",
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
      console.log("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 1 && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
        toast({
          title: "Password error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      } else if (formData.password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
        toast({
          title: "Password error",
          description: "Password must be at least 8 characters",
          variant: "destructive",
        });
        return;
      } else {
        setPasswordError("");
      }
    }

    if (currentStep === 2 && !formData.picture) {
      toast({
        title: "Profile picture required",
        description: "Please upload a profile picture to continue.",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep(currentStep + 1);

    // Show step-specific toast messages
    const stepMessages = [
      {
        title: "Personal Information",
        description: "Please fill in your personal details.",
      },
      {
        title: "Profile Picture",
        description: "Please upload your profile picture.",
      },
      {
        title: "Professional Information",
        description: "Add your teaching subjects and education.",
      },
      {
        title: "Additional Information",
        description: "Almost done! Add your contact info and bio.",
      },
    ];

    if (currentStep < stepMessages.length) {
      toast({
        title: `Step ${currentStep + 2}: ${stepMessages[currentStep].title}`,
        description: stepMessages[currentStep].description,
      });
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <EmailVerificationStep
            formData={formData}
            updateFormData={updateFormData}
            onStepComplete={handleStepComplete}
          />
        );
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />
        );
      case 2:
        return (
          <ProfilePictureStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ProfessionalInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <AdditionalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            registerState={registerState}
          />
        );
      default:
        return null;
    }
  };
  console.log("Form Data:", formData);
  return (
    <div className="space-y-8">
      <FormStepper steps={steps} currentStep={currentStep} />

      <Card className="overflow-hidden transition-all border-indigo-200 duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400 h-85">
        <CardContent className="pt-6">
          <form ref={formRef} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 0 && !formData.emailVerified) ||
                    (currentStep === 1 &&
                      (!formData.name ||
                        !formData.lastname ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        !!passwordError)) ||
                    (currentStep === 2 && !formData.picture)
                  }
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !formData.email ||
                    !formData.name ||
                    !formData.lastname ||
                    !formData.password ||
                    !formData.contactInfo ||
                    !formData.picture ||
                    formData.subjects.length === 0 ||
                    formData.education.length === 0 ||
                    !formData.bio
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
