import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePasswordByResetToken } from '@/api/repositories/UserRepositroy';
import { toast } from 'react-toastify';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface ResetPasswordFormInputs {
  password: string;
  passwordConfirm: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  // const token = searchParams.get('reset_password_token');
  const token = '123';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ResetPasswordFormInputs>();

  const passwordValue = watch('password');

  useEffect(() => {
    if (!token) {
      toast.error(t('notifications.reset_token_is_not_present'))
      navigate('/login');
    }
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', {
        type: 'manual',
        message: t('authentication.errors.password_mismatch'),
      });
      return;
    }

    try {
      const response = await updatePasswordByResetToken({
        reset_password_token: token,
        password: data.password,
        password_confirmation: data.passwordConfirm,
      });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error: any) {
      const messages = error?.response?.data?.errors || ['Unexpected error'];
      toast.error(messages.join(', '));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {t('authentication.reset_password')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <div className="mb-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: t('authentication.errors.required'),
                minLength: {
                  value: 6,
                  message: t('authentication.errors.invalid_password'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label={t('authentication.fields.password.title')}
                  placeholder={t('authentication.fields.password.placeholder')}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              rules={{
                required: t('authentication.errors.required'),
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label={t('authentication.fields.password_confirmation.title')}
                  placeholder={t('authentication.fields.password_confirmation.placeholder')}
                  fullWidth
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            {t('authentication.buttons.reset_password')}
          </Button>

          <Divider />

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            <a href="/login" className="text-primary-600 hover:underline">
              {t('authentication.back_to_login')}
            </a>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
