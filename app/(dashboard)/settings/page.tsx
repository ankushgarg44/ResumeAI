import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { User, Settings as SettingsIcon, CreditCard, Bell, Upload } from "lucide-react";

export default async function SettingsPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const avatarUrl = user?.imageUrl || "";
  const initials = getInitials(`${firstName} ${lastName}`.trim() || "User");

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full sm:w-auto flex flex-wrap h-auto p-1 bg-muted">
          <TabsTrigger value="profile" className="flex-1 sm:flex-none">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex-1 sm:flex-none">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex-1 sm:flex-none">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 sm:flex-none">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <Separator className="mb-6" />
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24 border border-border">
                  {avatarUrl && <AvatarImage src={avatarUrl} />}
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue={firstName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue={lastName} disabled />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={email} disabled />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button className="bg-primary text-primary-foreground" disabled>Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Account Administration</h3>
            <Separator className="mb-6" />
            <p className="text-sm text-muted-foreground mb-4">
              Your account settings are managed through Clerk Authentication. Please update your profile information or password directly via your identity provider.
            </p>
          </Card>
        </TabsContent>

        {/* BILLING TAB */}
        <TabsContent value="billing" className="mt-6 space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Billing & Subscriptions</h3>
            <Separator className="mb-6" />
            <div className="py-6 text-center text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
              <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-40 text-muted-foreground" />
              <p className="font-semibold text-foreground">Billing functionality coming soon.</p>
              <p className="text-sm mt-1">Pricing tiers and payment processing are currently under development.</p>
            </div>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <Separator className="mb-6" />
            <div className="py-6 text-center text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-40 text-muted-foreground" />
              <p className="font-semibold text-foreground">Notification settings coming soon.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
