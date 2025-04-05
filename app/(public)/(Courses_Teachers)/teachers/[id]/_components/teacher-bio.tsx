import { Briefcase } from "lucide-react";

interface TeacherBioProps {
  bio: string;
  education: string; // Now accepts a single string
}

export default function TeacherBio({ bio, education }: TeacherBioProps) {
  // Parse the education string
  const parseEducation = (eduString: string) => {
    if (!eduString) return null;
    
    const [year, ...rest] = eduString.split(': ');
    const description = rest.join(': ').trim();
    
    return { year: year?.trim(), description };
  };

  const educationData = parseEducation(education);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">About</h3>
        <div className="space-y-3 text-muted-foreground">
          {bio.split("\n").map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {educationData && (
        <div className="pt-4 space-y-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{educationData.description}</p>
                <p className="text-sm text-muted-foreground">{educationData.year}</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}