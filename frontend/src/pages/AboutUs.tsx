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
  Grid,
} from "@mui/material";

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      title: t("about_us.features.visual_interface.title"),
      desc: t("about_us.features.visual_interface.desc"),
    },
    {
      title: t("about_us.features.webhooks_support.title"),
      desc: t("about_us.features.webhooks_support.desc"),
    },
    {
      title: t("about_us.features.instant_launch.title"),
      desc: t("about_us.features.instant_launch.desc"),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: { xs: 6, md: 10 },
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path
            fill="#0ea5e9"
            fillOpacity="0.3"
            d="M0,192L80,186.7C160,181,320,171,480,176C640,181,800,203,960,192C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight={800} align="center" gutterBottom>
            {t("about_us.title")}
          </Typography>
          <Box sx={{ maxWidth: 700, mx: "auto", mb: 6 }}>
            <Typography variant="h6" align="center" color="text.secondary">
              {t("about_us.description")}
            </Typography>
          </Box>
        </motion.div>

        <Grid
          container
          spacing={4}
          mt={2}
          sx={{
            overflowX: 'auto',
            flexWrap: 'nowrap',
            py: 2,
          }}
        >
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={index}
              sx={{
                maxWidth: 400,
                flexShrink: 0,
              }}
            >
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={featureVariants}
                whileHover={{ scale: 1.03 }}
                style={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}
              >
                <Card
                  elevation={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    borderRadius: 4,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box mt={10} display="flex" justifyContent="center" gap={3} flexWrap="wrap">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/login")}
              sx={{ borderRadius: "999px", px: 5, py: 1.8, fontWeight: 600 }}
            >
              {t("about_us.cta.start")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/docs")}
              sx={{ borderRadius: "999px", px: 5, py: 1.8, fontWeight: 600 }}
            >
              {t("about_us.cta.docs")}
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
