import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { createPasswordResetToken } from '@/api/repositories/UserRepositroy';
import { toast } from 'react-toastify';

interface IResetPasswordFormInputs {
  email: string;
}

const ResetPasswordRequest = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IResetPasswordFormInputs>();

  const onSubmit = async (data: IResetPasswordFormInputs) => {
    try {
      const response  = await createPasswordResetToken({ email: data.email });
      setSubmitted(true);
      toast.success(response.data.message);
    } catch (error: any) {
      setError('email', {
        type: 'manual',
        message: t('authentication.errors.email_not_found'),
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {t('authentication.reset_password')}
        </h2>

        {submitted ? <>
          <Typography variant="body1" color="success.main" align="center" mb={3}>
            {t('authentication.reset_password_instructions_sent')}
          </Typography>

          <Divider mt={3}/>

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
        </> : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: t('authentication.errors.required'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('authentication.errors.invalid_email'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('authentication.fields.email.title')}
                  placeholder={t('authentication.fields.email.placeholder')}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {t('authentication.buttons.send_reset_link')}
            </Button>

            <Divider mt={3}/>

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
        )}
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
