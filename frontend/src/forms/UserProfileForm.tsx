import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { update } from '@/api/repositories/UserRepositroy';
import { IUpdateUserParams } from "@/types/user";
import { normalizeFromJsonApi } from "@/lib/normalizeUser";
import { useUserStore } from "@/stores/userStore";

const getSchema = (t: any) =>
  yup.object({
    firstName: yup.string().required(t('settings.personal_information.validations.first_name_is_required')),
    lastName: yup.string().required(t('settings.personal_information.validations.last_name_is_required')),
    email: yup.string().email(t('settings.personal_information.validations.email_is_invalid')).required(t('settings.personal_information.validations.email_is_required')),
    locale: yup.string().required(t('settings.personal_information.validations.language_is_required')),
  });

const UserProfileForm = ({ user, avatar, setAvatar, fileInputRef, handleAvatarChange }) => {
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => getSchema(t), [i18n.language]);
  const resolver = useMemo(() => yupResolver(schema), [schema]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IUpdateUserParams>({
    resolver,
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      locale: user.locale || "en",
      timezone: "",
    },
  });

  useEffect(() => {
    reset(undefined, { keepValues: true });
  }, [i18n.language]);

  const onSubmit = async (params: IUpdateUserParams) => {
    const formData = new FormData();

    formData.append("first_name", params.firstName);
    formData.append("last_name", params.lastName);
    formData.append("email", params.email);
    formData.append("locale", params.locale);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await update(user.id, formData);
      const normalized = normalizeFromJsonApi(response.data.data);
      useUserStore.getState().setUser(normalized);
      toast.success(t("notifications.successfully_updated"));
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(t("notifications..error"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <Card className="flex-1 md:w-2/3">
          <CardHeader title={t("settings.personal_information.title")} />
          <Divider />
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar
                src={avatar ? URL.createObjectURL(avatar) : user.avatarUrl}
                className="w-16 h-16"
              />
              <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                {t("settings.buttons.change_avatar")}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <TextField
                fullWidth
                label={t("settings.personal_information.first_name")}
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label={t("settings.personal_information.last_name")}
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label={t("settings.personal_information.email")}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            <div>
              <Typography variant="subtitle2" gutterBottom>
                {t("settings.personal_information.language")}
              </Typography>
              <Select
                fullWidth
                defaultValue={user.locale || "ru"}
                {...register("locale")}
                error={!!errors.locale}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ru">Русский</MenuItem>
              </Select>
              {errors.locale && (
                <Typography color="error" variant="caption">
                  {errors.locale.message}
                </Typography>
              )}
            </div>

            <Button type="submit" variant="contained" color="primary">
              {t("settings.buttons.update_profile")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default UserProfileForm;
