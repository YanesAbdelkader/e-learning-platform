"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormState, StepProps } from "../_components/signup-types";

interface AdditionalInfoStepProps extends StepProps {
  registerState: FormState;
}

export default function AdditionalInfoStep({
  formData,
  updateFormData,
  registerState,
}: AdditionalInfoStepProps) {
  const [newLink, setNewLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const { toast } = useToast();

  // Handle adding a link
  const handleAddLink = () => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (newLink && !formData.links.includes(newLink)) {
      if (urlPattern.test(newLink)) {
        const updatedLinks = [...formData.links, newLink];
        updateFormData({ links: updatedLinks });
        setNewLink("");
        setLinkError("");
        toast({
          title: "Link added",
          description: "Your professional link has been added.",
        });
      } else {
        setLinkError("Please enter a valid URL");
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL (e.g., https://example.com).",
          variant: "destructive",
        });
      }
    } else if (formData.links.includes(newLink)) {
      toast({
        title: "Link already exists",
        description: "This link is already in your list.",
        variant: "destructive",
      });
    }
  };

  // Handle removing a link
  const handleRemoveLink = (index: number) => {
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    updateFormData({ links: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Information</Label>
        <Input
          id="contactInfo"
          placeholder="Phone number (e.g., 0123456789)"
          value={formData.contactInfo}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^0\d{0,9}$/.test(value)) {
              updateFormData({ contactInfo: value });
            }
          }}
          maxLength={10}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Professional Links</Label>
        <div className="flex space-x-2">
          <Input
            placeholder="Add a link (e.g., LinkedIn, portfolio)"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <Button
            type="button"
            className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleAddLink}
            disabled={!newLink}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {linkError && <p className="text-sm text-red-500">{linkError}</p>}

        <div className="flex flex-col gap-2 mt-2">
          {formData.links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-muted px-3 py-2 rounded"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
              >
                {link}
              </a>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1"
                onClick={() => handleRemoveLink(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself, your teaching experience, and approach"
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          className="min-h-[150px]"
          required
        />
      </div>

      {registerState.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{registerState.error}</AlertDescription>
        </Alert>
      )}

      {registerState.success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{registerState.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
