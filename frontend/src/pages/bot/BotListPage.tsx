import React, { useEffect, useState } from "react";
import { index as fetchBots, destroy as removeBot } from "@/api/repositories/BotRepository";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { normalizeBot } from "@/lib/normalizeBot";
import {
  Avatar,
  Stack,
  Typography,
  Box,
  Button,
  Paper,
  IconButton,
  Tooltip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/components/UI/loader/Loader";

const BotListPage = () => {
  const { t } = useTranslation();
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, bot: null });
  const navigate = useNavigate();

  const loadBots = async () => {
    setLoading(true);
    try {
      const res = await fetchBots();
      const normalizedBots = res.data.data.map(normalizeBot);
      setBots(normalizedBots || []);
    } catch (err) {
      const messages = err?.response?.data?.errors || [t('notifications.error')];
      toast.error(messages.join(', '));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBots();
  }, [t]);

  const openDeleteDialog = (bot) => setDeleteDialog({ open: true, bot });
  const closeDeleteDialog = () => setDeleteDialog({ open: false, bot: null });

  const handleConfirmDelete = async () => {
    try {
      await removeBot(deleteDialog.bot.id);
      setBots(prev => prev.filter(b => b.id !== deleteDialog.bot.id));
      toast.success(t('bot_list.notifications.deleted'));
    } catch {
      toast.error(t('notifications.error'));
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5, p: 5 }}>
      <Box py={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            {t('bot_list.title')}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate("/bots/new")}
          >
            {t('bot_list.buttons.new')}
          </Button>
        </Stack>

        {loading ? (
          <Loader />
        ) : bots.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {t('bot_list.empty')}
          </Typography>
        ) : (
          <Stack spacing={2}>
            {bots.map(bot => (
              <Paper
                key={bot.id}
                variant="outlined"
                sx={{ p: 2, '&:hover': { backgroundColor: '#f9f9f9', cursor: 'pointer' } }}
                onClick={() => navigate(`/bots/${bot.id}`)}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={bot.avatarUrl || undefined}
                    alt={bot.name || t('bot_list.unnamed')}
                    sx={{ width: 40, height: 40 }}
                  >
                    {!bot.avatarUrl && bot.name?.[0]
                    }</Avatar>

                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {bot.name || t('bot_list.unnamed')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('bot_list.details', { id: bot.id, provider: bot.provider })}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} onClick={e => e.stopPropagation()}>
                    <Tooltip title={t('bot_list.tooltips.edit')}>
                      <IconButton
                        size="small"
                        aria-label={t('bot_list.tooltips.edit')}
                        onClick={() => navigate(`/bots/${bot.id}/edit`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={t('bot_list.tooltips.delete')}>
                      <IconButton
                        size="small"
                        color="error"
                        aria-label={t('bot_list.tooltips.delete')}
                        onClick={() => openDeleteDialog(bot)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
          <DialogTitle>{t('bot_list.delete_confirm.title')}</DialogTitle>
          <DialogContent>
            <Typography>
              {t('bot_list.delete_confirm.description', { name: deleteDialog.bot?.name || deleteDialog.bot?.id })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>{t('common.cancel')}</Button>
            <Button color="error" onClick={handleConfirmDelete}>
              {t('common.delete')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default BotListPage;