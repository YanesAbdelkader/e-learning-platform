import { Mail, Phone, Globe, Twitter, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ContactInfo, SocialLink } from "../_types/teacher"

interface TeacherContactProps {
  contactInfo: ContactInfo
  socialLinks: SocialLink[]
}

export default function TeacherContact({ contactInfo, socialLinks }: TeacherContactProps) {
  return (
    <>
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <div className="space-y-3">
        {contactInfo.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span>{contactInfo.email}</span>
          </div>
        )}

        {contactInfo.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>{contactInfo.phone}</span>
          </div>
        )}

        {contactInfo.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <a
              href={contactInfo.website}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contactInfo.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>

      {socialLinks.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6">Social Media</h3>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <Button key={index} variant="outline" size="icon" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform === "twitter" && <Twitter className="w-4 h-4" />}
                  {link.platform === "linkedin" && <Linkedin className="w-4 h-4" />}
                  {link.platform === "github" && <Github className="w-4 h-4" />}
                </a>
              </Button>
            ))}
          </div>
        </>
      )}
    </>
  )
}

