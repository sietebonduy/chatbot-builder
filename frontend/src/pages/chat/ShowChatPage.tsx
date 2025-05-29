import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Card, CardHeader, Avatar, Typography, Button, Paper, TextField, InputAdornment, IconButton, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/UI/loader/Loader';
import {
  show as fetchChat,
  sendMessage,
} from '@/api/repositories/ChatRepository';
import { IChat, IMessageAttributes } from '@/types/chat';

const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

const Bubble = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isUser' })<{ isUser: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(1.5),
  maxWidth: '70%',
  backgroundColor: isUser ? theme.palette.primary.light : theme.palette.grey[200],
  borderRadius: 16,
  borderTopLeftRadius: isUser ? 4 : 16,
  borderTopRightRadius: isUser ? 16 : 4,
}));

const InputBox = styled(Box)({
  padding: '8px 16px',
  borderTop: '1px solid rgba(0,0,0,0.1)',
});

const ShowChatPage: React.FC = () => {
  const { t } = useTranslation();
  const { id: id, chat_id: chatId } = useParams<{ id: string, chat_id: string }>();
  const navigate = useNavigate();

  const [chat, setChat] = useState<IChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) return;
    setLoading(true);
    fetchChat(chatId)
      .then(setChat)
      .catch(() => setError(t('chat.show.load_error')))
      .finally(() => setLoading(false));
  }, [chatId, t]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !chat) return;
    setMsgLoading(true);
    try {
      await sendMessage(chatId, newMessage.trim());
      setNewMessage('');
    } finally {
      setMsgLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  if (!chat) return null;

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', pt: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/bots/${id}`)} sx={{ mb: 2, textTransform: 'none' }}>
          {t('chats.back')}
        </Button>
      </Box>

      <Box sx={{ height: '100vh', display: 'flex', py: 2, gap: 2 }}>
        <Box sx={{ width: 280 }}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  {chat.bot.name[0]}
                </Avatar>
              }
              title={chat.bot.name}
              subheader={`@${chat.bot.username}`}
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
            />
          </Card>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                  {chat.client.firstName?.[0] || '?'}
                </Avatar>
              }
              title={chat.client.firstName || t('chats.no_name')}
              subheader={t('chat.show.subtitle', { count: chat.messages.length })}
              titleTypographyProps={{ variant: 'subtitle1' }}
              subheaderTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              sx={{ px: 2, py: 1 }}
            />
          </Box>

          <MessagesContainer>
            { chat.messages.map((msg: IMessageAttributes) => {
              const isUser = msg.fromBot === false;
              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-start' : 'flex-end',
                  }}
                >
                  <Bubble isUser={isUser}>
                    <Typography variant="body2">{msg.content}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Bubble>
                </Box>
              );
              })
            }
            <div ref={messagesEnd} />
          </MessagesContainer>

          <InputBox>
            <TextField
              fullWidth
              placeholder={t('chat.show.input_placeholder')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={msgLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      disabled={!newMessage.trim() || msgLoading}
                      onClick={handleSend}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </InputBox>
        </Box>
      </Box>
    </Container>
  );
};

export default ShowChatPage;
