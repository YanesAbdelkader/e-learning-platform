import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "../_components/profileInfo";
import PasswordEdit from "../_components/passwordE";
import TwoFactorAuth from "../_components/2fa";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="info">Profile infos</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <ProfileInfo />
        </TabsContent>
        <TabsContent value="password">
          <PasswordEdit />
        </TabsContent>
        <TabsContent value="2fa">
          <TwoFactorAuth />
        </TabsContent>
      </Tabs>
    </div>
  );
}
