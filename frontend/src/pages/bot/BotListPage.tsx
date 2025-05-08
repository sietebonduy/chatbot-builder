import React, { useEffect, useState } from "react";
import { index as fetchBots, destroy as removeBot } from "@/api/repositories/BotRepository";
import { useNavigate } from "react-router-dom";
import { Avatar, Stack, Typography, Box, Button, Paper, IconButton, Tooltip, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/components/UI/loader/Loader";

const BotListPage = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBots()
      .then((res) => {
        setBots(res.data || []);
      })
      .catch((err) => {
        console.error("Ошибка загрузки: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (bot) => {
    if (confirm(`Удалить бота ${bot.name || ""}?`)) {
      removeBot(bot.id).then(() => {
        setBots((prev) => prev.filter((b) => b.id !== bot.id));
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Мои чат-боты
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate("/bots/new")}
          >
            Новый бот
          </Button>
        </Stack>

        {loading ? (
          <Loader />
        ) : bots.length === 0 ? (
          <Typography variant="body2">Нет доступных ботов.</Typography>
        ) : (
          <Stack spacing={2}>
            {bots.map((bot) => (
              <Paper
                key={bot.id}
                variant="outlined"
                sx={{
                  p: 2,
                  "&:hover": { backgroundColor: "#f9f9f9", cursor: "pointer" },
                }}
                onClick={() => navigate(`/bots/${bot.id}`)}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={bot.avatarUrl || undefined}
                    alt={bot.name || "Бот"}
                    sx={{ width: 40, height: 40 }}
                  >
                    {!bot.avatarUrl && bot.name?.[0]}
                  </Avatar>

                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {bot.name || "Без имени"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {bot.id} · Провайдер: {bot.provider}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="Редактировать">
                      <IconButton size="small" onClick={() => navigate(`/bots/${bot.id}/edit`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Удалить">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(bot)}
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
      </Box>
    </Container>
  );
};

export default BotListPage;
