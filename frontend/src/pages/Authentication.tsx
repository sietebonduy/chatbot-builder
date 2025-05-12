import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PageTypes = {
  LOGIN: 0,
  REGISTER: 1,
};

interface AuthenticationProps {
  pageType: number;
}

interface AuthFormInputs {
  email: string;
  password: string;
  passwordConfirm?: string;
}

const Authentication = ({ pageType = PageTypes.LOGIN }: AuthenticationProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<AuthFormInputs>();

  const passwordValue = watch("password");

  const onSubmit = async (data: AuthFormInputs) => {
    if (pageType === PageTypes.REGISTER && data.password !== data.passwordConfirm) {
      setError("passwordConfirm", {
        type: "manual",
        message: t("authentication.errors.password_mismatch"),
      });
      return;
    }

    try {
      if (pageType === PageTypes.LOGIN) {
        await signIn({ email: data.email, password: data.password });
      } else {
        await registerUser({ email: data.email, password: data.password });
      }

      navigate("/");
    } catch (e: any) {
      setError("email", { type: "manual", message: t("authentication.errors.invalid_credentials") });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {pageType === PageTypes.LOGIN
            ? t("authentication.login")
            : t("authentication.registration")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: t("authentication.errors.required"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("authentication.errors.invalid_email"),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("authentication.fields.email.title")}
                  placeholder={t("authentication.fields.email.placeholder")}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: t("authentication.errors.required"),
                minLength: {
                  value: 6,
                  message: t("authentication.errors.invalid_password"),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label={t("authentication.fields.password.title")}
                  placeholder={t("authentication.fields.password.placeholder")}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </div>

          {pageType === PageTypes.REGISTER && (
            <div className="mb-4">
              <Controller
                name="passwordConfirm"
                control={control}
                defaultValue=""
                rules={{
                  required: t("authentication.errors.required"),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label={t("authentication.fields.password_confirmation.title")}
                    placeholder={t("authentication.fields.password_confirmation.placeholder")}
                    fullWidth
                    error={!!errors.passwordConfirm}
                    helperText={errors.passwordConfirm?.message}
                  />
                )}
              />
            </div>
          )}

          {pageType === PageTypes.LOGIN && (
            <div className="flex justify-end mb-4">
              <Typography variant="body2" color="primary">
                <a href="/forgot_password" className="hover:underline">
                  {t('authentication.forgot_password')}
                </a>
              </Typography>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            {pageType === PageTypes.LOGIN
              ? t("authentication.buttons.login")
              : t("authentication.buttons.register")}
          </Button>

          <Divider />

          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            {pageType === PageTypes.LOGIN ? (
              <>
                {t('authentication.dont_have_an_account_yet')}{' '}
                <a href="/sign_up" className="text-primary-600 hover:underline">
                  {t('authentication.registration')}
                </a>
              </>
            ) : (
              <>
                {t('authentication.already_have_an_account')}{' '}
                <a href="/login" className="text-primary-600 hover:underline">
                  {t('authentication.login')}
                </a>
              </>
            )}
          </Typography>
        </form>
      </div>
    </div>
  );
};

export {
  PageTypes,
  Authentication,
};
