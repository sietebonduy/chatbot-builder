import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "calc(100vh - 4rem)",
        py: 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            fill="#94a3b8"
            fillOpacity="0.3"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,234.7C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L0,320Z"
          ></path>
        </svg>
      </Box>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight={800} gutterBottom align="center">
            {t("about_us.title")}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" mb={6}>
            {t("about_us.description")}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" fontWeight={600} gutterBottom align="center">
            {t("about_us.team_title")}
          </Typography>
          <Grid container spacing={4} justifyContent="center" mt={2}>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card elevation={4} sx={{ p: 3, textAlign: "center" }}>
                  <Avatar
                    src="https://via.placeholder.com/150"
                    alt="Ваше Имя"
                    sx={{
                      width: 96,
                      height: 96,
                      mx: "auto",
                      mb: 2,
                      border: "3px solid #6366f1",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">Ваше Имя</Typography>
                    <Typography color="text.secondary">
                      {t("about_us.team_member_1")}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        <Box mt={8} display="flex" justifyContent="center" gap={2}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/contact_us")}
              size="large"
              sx={{ borderRadius: "999px", px: 4, py: 1.5 }}
            >
              {t("about_us.contact_us")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              size="large"
              sx={{ borderRadius: "999px", px: 4, py: 1.5 }}
            >
              {t("about_us.back_to_home")}
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
