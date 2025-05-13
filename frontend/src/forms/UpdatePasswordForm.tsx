import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

import { updatePassword } from '@/api/repositories/UserRepositroy';
import { IUpdatePasswordParams } from "@/types/user";

const getSchema = (t: any) =>
  yup.object({
    currentPassword: yup
      .string()
      .required(t('settings.change_password.validations.current_password_required')),
    password: yup
      .string()
      .min(6, t('settings.change_password.validations.password_too_short'))
      .required(t('settings.change_password.validations.new_password_required')),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], t('settings.change_password.validations.passwords_must_match'))
      .required(t('settings.change_password.validations.confirmation_required')),
  });

const UpdatePasswordForm = () => {
  const { t } = useTranslation();
  const schema = getSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUpdatePasswordParams>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (params: IUpdatePasswordParams) => {
    const formData = new FormData();

    formData.append("current_password", params.currentPassword);
    formData.append("password", params.password);
    formData.append("password_confirmation", params.passwordConfirmation);

    try {
      const { data } = await updatePassword(formData);
      toast.success(data.data?.message || t("notifications.success"));
      reset();
    } catch (error: any) {
      const message = error?.response?.data?.errors?.[0] || t("notifications.error");
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card className="w-full">
        <CardHeader title={t("settings.change_password.title")} />
        <Divider />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextField
              fullWidth
              label={t("settings.change_password.fields.current_password")}
              type="password"
              placeholder={t("settings.change_password.placeholders.current_password")}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              {...register("currentPassword")}
            />
            <TextField
              fullWidth
              label={t("settings.change_password.fields.new_password")}
              type="password"
              placeholder={t("settings.change_password.placeholders.new_password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <TextField
              fullWidth
              label={t("settings.change_password.fields.password_confirmation")}
              type="password"
              placeholder={t("settings.change_password.placeholders.password_confirmation")}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {t("settings.buttons.change_password")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default UpdatePasswordForm;
