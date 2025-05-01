import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-slate-50 text-gray-900 flex flex-col items-center justify-center p-6 min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#94a3b8"
            fillOpacity="0.3"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,234.7C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {t("about_us.title")}
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-600">
          {t("about_us.description")}
        </p>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-8">{t("about_us.team_title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member"
              />
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-gray-500">{t("about_us.team_member_1")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member"
              />
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-500">{t("about_us.team_member_2")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member"
              />
              <h3 className="text-xl font-semibold mb-2">Michael Lee</h3>
              <p className="text-gray-500">{t("about_us.team_member_3")}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/contact_us")}
            className="bg-indigo-600 text-white px-8 py-4 rounded-full shadow hover:bg-indigo-700 transition-all duration-300"
          >
            {t("about_us.contact_us")}
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-white border border-gray-300 text-gray-800 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            {t("about_us.back_to_home")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
