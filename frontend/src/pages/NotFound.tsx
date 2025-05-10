import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 4rem)',
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        px: 3,
        py: 6,
        textAlign: 'center',
      }}
    >
      <motion.svg
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        <path
          fill="#64748b"
          fillOpacity="0.4"
          d="M0,160L60,154.7C120,149,240,139,360,144C480,149,600,171,720,176C840,181,960,171,1080,144C1200,117,1320,75,1380,53.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </motion.svg>

      <Box sx={{ zIndex: 10, maxWidth: '600px' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Typography variant="h1" fontWeight="bold" gutterBottom>
            {t('error_pages.not_found.code')}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {t('error_pages.not_found.page_not_found')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('error_pages.not_found.sorry_message')}
          </Typography>

          <Button
            onClick={() => navigate('/')}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: '999px',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              boxShadow: 3,
            }}
          >
            {t('error_pages.not_found.go_home')}
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default NotFound;
