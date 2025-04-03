import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "../_components/profileInfo";
import PasswordEdit from "../_components/passwordE";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="info">Profile infos</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <ProfileInfo />
        </TabsContent>
        <TabsContent value="password">
          <PasswordEdit />
        </TabsContent>
      </Tabs>
    </div>
  );
}
