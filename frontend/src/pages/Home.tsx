import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/userStore";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleStart = () => {
    navigate(user ? "/dashboard" : "/login");
  };

  const handleLearnMore = () => {
    navigate("/about_us");
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "calc(100vh - 4rem)", display: "flex", alignItems: "center" }}>
      <Stack spacing={4} alignItems="center" textAlign="center" width="100%">
        <MotionTypography
          variant="h2"
          fontWeight="bold"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("home.welcome")}
        </MotionTypography>

        <MotionTypography
          variant="h6"
          color="text.secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t("home.description")}
        </MotionTypography>

        <MotionBox
          display="flex"
          gap={2}
          justifyContent="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStart}
            sx={{ borderRadius: 999 }}
          >
            {t("home.start")}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleLearnMore}
            sx={{ borderRadius: 999 }}
          >
            {t("home.learn_more")}
          </Button>
        </MotionBox>
      </Stack>
    </Container>
  );
};

export default Home;
