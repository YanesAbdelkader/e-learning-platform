import { Phone, Globe, Twitter, Linkedin, Github, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeacherContactProps {
  contactInfo: string;
  socialLinks: string[];
}

export default function TeacherContact({
  contactInfo,
  socialLinks,
}: TeacherContactProps) {
  const getPlatform = (url: string) => {
    if (url.includes("twitter.com")) return "twitter";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("github.com")) return "github";
    return "website";
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "Twitter";
      case "linkedin":
        return "LinkedIn";
      case "github":
        return "GitHub";
      default:
        return "Website";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="space-y-3">
          {contactInfo && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <a
                href={`tel:${contactInfo}`}
                className="hover:underline hover:text-primary"
              >
                {contactInfo}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Social Media</h3>
        {socialLinks.length > 0 ? (
          <ul className="space-y-3">
            {socialLinks.map((url, index) => {
              const platform = getPlatform(url);
              const platformName = getPlatformName(platform);
              return (
                <li key={index} className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full h-9 w-9"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platformName}
                    >
                      {platform === "twitter" && (
                        <Twitter className="w-4 h-4" />
                      )}
                      {platform === "linkedin" && (
                        <Linkedin className="w-4 h-4" />
                      )}
                      {platform === "github" && <Github className="w-4 h-4" />}
                      {platform === "website" && <Globe className="w-4 h-4" />}
                    </a>
                  </Button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-primary"
                  >
                    {platformName}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-muted-foreground flex items-center gap-2">
            <Info className="w-4 h-4" />
            <p>No social links available</p>
          </div>
        )}
      </div>
    </div>
  );
}
