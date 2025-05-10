import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { index as fetchFlows } from "@/api/repositories/ChatbotFlowRepository";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Tooltip,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/components/UI/loader/Loader";

const ChatbotFlowListPage = () => {
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlows()
      .then((res) => setFlows(res.data || []))
      .catch((err) => console.error("Ошибка загрузки флоу:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (flowId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот сценарий?")) {
      console.log(`Удалить флоу с ID: ${flowId}`);
    }
  };

  return (
    <Container maxWidth="md" className="my-5 p-5">
      <Box py={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">
            Сценарии чат-ботов
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate("/chatbot_flows/new")}
          >
            Новый сценарий
          </Button>
        </Stack>

        {loading ? (
          <Loader />
        ) : flows.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Нет доступных сценариев.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {flows.map((flow) => (
              <Card
                key={flow.id}
                variant="outlined"
              >
                <CardActionArea onClick={() => navigate(`/chatbot_flows/${flow.slug}/edit`)}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {flow.name || `Flow #${flow.id}`}
                      </Typography>

                      <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
                        <Tooltip title="Редактировать">
                          <IconButton size="small" onClick={() => navigate(`/chatbot_flows/${flow.slug}/edit`)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Удалить">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(flow.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {flow.description || "Без описания"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default ChatbotFlowListPage;
