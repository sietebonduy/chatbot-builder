import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";
import { useUserStore } from '@/stores/userStore';
import UserProfileForm from "@/forms/UserProfileForm.tsx";

const Settings: React.FC = () => {
  const { user } = useUserStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = React.useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography color="text.secondary">
          Manage your application preferences and security settings.
        </Typography>
      </div>

      <UserProfileForm
        user={user}
        avatar={avatar}
        setAvatar={setAvatar}
        fileInputRef={fileInputRef}
        handleAvatarChange={handleAvatarChange}
      />

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="flex-1">
          <CardHeader title="Devices" />
          <Divider />
          <CardContent>
            {[
              { name: "iPhone 14 Pro", lastUsed: "2 days ago" },
              { name: "Surface Pro 8", lastUsed: "1 week ago" }
            ].map((device, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <Typography>{device.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last used {device.lastUsed}
                  </Typography>
                </div>
                <Button variant="outlined" size="small">Remove</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connected Accounts - 1/2 width */}
        <Card className="flex-1">
          <CardHeader title="Connected Accounts" />
          <Divider />
          <CardContent>
            {[
              { name: "Google", icon: <Google color="error" />, email: "praveen@gmail.com" },
              { name: "GitHub", icon: <GitHub />, email: "praveenjuge" }
            ].map((acc, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-4">
                  {acc.icon}
                  <div>
                    <Typography>{acc.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connected as {acc.email}
                    </Typography>
                  </div>
                </div>
                <Button variant="outlined" size="small">Disconnect</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader title="Change Password" />
        <Divider />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              placeholder="Repeat new password"
            />
          </div>
          <div className="mt-6">
            <Button variant="contained" color="primary">Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
