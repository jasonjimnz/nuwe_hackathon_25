import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { ConsultationService } from '../services/consultation_service';
import { useParams } from 'react-router-dom';
import { authStore } from '../store/authStore';
import { useStore } from '@nanostores/react';

function ConsultationDetail() {
  const { consultationId } = useParams();
  const { isAuthenticated, user } = useStore(authStore);
  const [messages, setMessages] = useState([]);
  const [consultation, setConsultation] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const consultationMessages =
        await ConsultationService.getConsultationsMessagesById(consultationId);
      console.log('messages - - - -', consultationMessages);
      setMessages(consultationMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      var receiverId;
      const { doctor, patient } = consultation;
      if (doctor.id === user.id) {
        receiverId = patient.id;
      } else if (patient.id === user.id) {
        receiverId = doctor.id;
      }
      await ConsultationService.sendMessage({
        content: newMessage,
        senderId: user.id,
        receiverId: receiverId,
        consultationId: consultationId,
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchConsultation = async () => {
    try {
      const consultation = await ConsultationService.getConsultationById(
        consultationId
      );
      console.log('consultation', consultation);
      setConsultation(consultation);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchConsultation();
  }, [consultationId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Conversación
      </Typography>
      <List>
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ListItem
              onClick={() => console.log(' after consultation', messages)}
            >
              <ListItemText
                primary={message.content}
                secondary={`Sent by: ${message.sender.name}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Nuevo mensaje"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ ml: 2 }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

export default ConsultationDetail;
