import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { ConsultationService } from "../services/consultationService";

function ConsultationDetail({ consultationId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const consultation = await ConsultationService.getConsultationById(
        consultationId
      );
      setMessages(consultation.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await ConsultationService.sendMessage(consultationId, {
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [consultationId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Consultation Messages
      </Typography>
      <List>
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ListItem>
              <ListItemText
                primary={message.content}
                secondary={`Sent by: ${message.sender.name}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <TextField
          label="New Message"
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
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ConsultationDetail;
