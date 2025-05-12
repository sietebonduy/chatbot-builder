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
import { useTranslation } from 'react-i18next';
import UserProfileForm from "@/forms/UserProfileForm.tsx";
import LoginActivity from '@/components/LoginActivity';
import UpdatePasswordForm from "../forms/UpdatePasswordForm.tsx";

const Settings: React.FC = () => {
  const { t } = useTranslation();
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
        <Typography variant="h4" fontWeight="bold" gutterBottom>{t('settings.title')}</Typography>
        <Typography color="text.secondary">
          {t('settings.subtitle')}
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
        <LoginActivity activities={null}/>

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

     <UpdatePasswordForm />
    </div>
  );
};

export default Settings;
