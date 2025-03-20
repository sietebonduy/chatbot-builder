import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validateEmail, validatePassword } from '../utilities/validations.ts';
import { useAuth } from '../hooks/useAuth.ts';

const PageTypes = {
  LOGIN: 0,
  REGISTER: 1,
};

interface AuthenticationProps {
  pageType: number;
}

const initialErrorsState = {
  email: "",
  password: "",
  passwordConfirm: "",
  api: "",
}

const Authentication = ({ pageType = PageTypes.LOGIN }: AuthenticationProps) => {
  const { t } = useTranslation();
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(initialErrorsState);
  const { loading, error, register, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedErrors = { ...errors };

    if (!validateEmail(email)) {
      updatedErrors.email = t("authentication.errors.invalid_email");
    } else {
      updatedErrors.email = "";
    }

    if (!validatePassword(password)) {
      updatedErrors.password = t("authentication.errors.invalid_password");
    } else {
      updatedErrors.password = "";
    }

    if (pageType === PageTypes.REGISTER && password !== passwordConfirm) {
      updatedErrors.passwordConfirm = t("authentication.errors.password_mismatch");
    } else {
      updatedErrors.passwordConfirm = "";
    }

    setErrors(updatedErrors);

    if (Object.values(updatedErrors).some(error => error !== "")) {
      return;
    }

    const credentials = { email, password };

    try {
      if (pageType === PageTypes.LOGIN) {
        await signIn(credentials);
      } else {
        await register(credentials);
      }

      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (cookies.jwt) {
      navigate('/editor');
    }
  }, [cookies.jwt, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {pageType === PageTypes.LOGIN ? t("authentication.login") : t("authentication.registration")}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("authentication.fields.email.title")}</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("authentication.fields.email.placeholder")} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            { errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p> }
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{ t("authentication.fields.password.title") }</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("authentication.fields.password.placeholder")} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            { errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p> }
          </div>

          { pageType === PageTypes.REGISTER && (
            <div className="mb-6">
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">{t("authentication.fields.password_confirmation.title")}</label>
              <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder={ t("authentication.fields.password_confirmation.placeholder") } className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              { errors.passwordConfirm && <p className="text-red-500 text-sm mb-4">{errors.passwordConfirm}</p> }
            </div>
          )}

          { error && <p className="text-red-500 text-sm mb-4">{error.message}</p> }

          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            { loading ? t("authentication.buttons.loading") : pageType === PageTypes.LOGIN ? t("authentication.buttons.login") : t("authentication.buttons.register") }
          </button>
        </form>
      </div>
    </div>
  );
};

export {
  PageTypes,
  Authentication,
};
