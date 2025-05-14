import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { index as fetchFlows, destroy as deleteFlow } from "@/api/repositories/ChatbotFlowRepository";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Typography,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/components/UI/loader/Loader";

const ChatbotFlowListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, flowId: null });

  const loadFlows = async () => {
    setLoading(true);
    try {
      const res = await fetchFlows();
      setFlows(res.data ?? []);
    } catch {
      toast.error(t("notifications.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlows();
  }, [t]);

  const openDeleteDialog = (id) => setDeleteDialog({ open: true, flowId: id });
  const closeDeleteDialog = () => setDeleteDialog({ open: false, flowId: null });

  const handleConfirmDelete = async () => {
    try {
      await deleteFlow(deleteDialog.flowId);
      setFlows((prev) => prev.filter((f) => f.id !== deleteDialog.flowId));
      toast.success(t("flow_list.notifications.deleted"));
    } catch {
      toast.error(t("notifications.error"));
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5, p: 5 }}>
      <Box py={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">
            {t("flow_list.title")}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate("/chatbot_flows/new")}
          >
            {t("flow_list.buttons.new")}
          </Button>
        </Stack>

        {loading ? (
          <Loader />
        ) : flows.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {t("flow_list.empty")}
          </Typography>
        ) : (
          <Stack spacing={2}>
            {flows.map((flow) => (
              <Card key={flow.id} variant="outlined" sx={{ cursor: "pointer" }}>
                <Box onClick={() => navigate(`/chatbot_flows/${flow.slug}/edit`)}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {flow.name || `Flow #${flow.id}`}
                      </Typography>
                      <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
                        <Tooltip title={t("flow_list.tooltips.edit")}>
                          <IconButton
                            size="small"
                            aria-label={t("flow_list.tooltips.edit")}
                            onClick={() => navigate(`/chatbot_flows/${flow.slug}/edit`)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t("flow_list.tooltips.delete")}>
                          <IconButton
                            size="small"
                            color="error"
                            aria-label={t("flow_list.tooltips.delete")}
                            onClick={() => openDeleteDialog(flow.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {flow.description || t("flow_list.empty")}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Stack>
        )}

        <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
          <DialogTitle>{t("flow_list.delete_confirm.title")}</DialogTitle>
          <DialogContent>
            <Typography>{t("flow_list.delete_confirm.description")}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>{t("common.cancel")}</Button>
            <Button color="error" onClick={handleConfirmDelete}>
              {t("common.delete")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ChatbotFlowListPage;
