import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { index } from '@/api/repositories/LoginActivityRepository';
import { ILoginActivity } from '@/types/loginActivity';
import Loader from "@/components/UI/loader/Loader.tsx";


const LoginActivity = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<ILoginActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await index();
        console.log(data);
        setActivities(data.data.map(item => item.attributes));
      } catch (error) {
        console.error('Failed to fetch login activities', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader title={t('settings.login_activity.title')} />
      <Divider />
      <CardContent>
        {loading ? (
          <Loader />
        ) : activities.length === 0 ? (
          <Typography>{t('settings.login_activity.no_activities_found')}</Typography>
        ) : (
          activities.map((activity, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {activity.ip} &mdash; {activity.country || t('settings.login_activity.unknown_country')}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Grid container spacing={1} mt={1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight={500}>
                    { t('settings.login_activity.devise_type') }
                    <Typography component="span" variant="body2" color="text.secondary">
                      {activity.deviceType || t('settings.login_activity.unknown')}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight={500}>
                    { t('settings.login_activity.devise') }
                    <Typography component="span" variant="body2" color="text.secondary">
                      {activity.deviceName || t('settings.login_activity.unknown')}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight={500}>
                    { t('settings.login_activity.os') }
                    <Typography component="span" variant="body2" color="text.secondary">
                      {activity.osName} {activity.osVersion || ""}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight={500}>
                    { t('settings.login_activity.browser') }
                    <Typography component="span" variant="body2" color="text.secondary">
                      {activity.browserName} {activity.browserVersion || ""}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {t("settings.login_activity.used_at")}
                {new Date(activity.createdAt).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LoginActivity;
