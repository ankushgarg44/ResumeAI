import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockUserSettings } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";
import { User, Settings as SettingsIcon, CreditCard, Bell, Upload } from "lucide-react";

export default function SettingsPage() {
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
                  <AvatarImage src={mockUserSettings.profile.avatarUrl} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {getInitials(`${mockUserSettings.profile.firstName} ${mockUserSettings.profile.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue={mockUserSettings.profile.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue={mockUserSettings.profile.lastName} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockUserSettings.profile.email} />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button className="bg-primary text-primary-foreground">Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <Separator className="mb-6" />
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="pt-2">
                <Button>Update Password</Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-destructive/20 border-2">
            <h3 className="text-lg font-semibold text-destructive mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated resumes. This action cannot be undone.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </Card>
        </TabsContent>

        {/* BILLING TAB */}
        <TabsContent value="billing" className="mt-6 space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
            <Separator className="mb-6" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-2xl font-bold uppercase tracking-wider text-primary">{mockUserSettings.billing.plan}</h4>
                  <Badge className="bg-primary text-primary-foreground">Active</Badge>
                </div>
                <p className="text-muted-foreground">
                  You are currently on the Pro plan. Your next billing date is {mockUserSettings.billing.nextBillingDate}.
                </p>
              </div>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
            
            <h4 className="font-semibold mb-4">Payment Method</h4>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-card border border-border rounded flex items-center justify-center font-bold text-xs">
                  VISA
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <Separator className="mb-6" />
            <p className="text-muted-foreground italic text-sm">Notification settings coming soon.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
