import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const EditNodeModal = ({ isOpen, onClose, initialLabel, onSave }) => {
  const [label, setLabel] = useState(initialLabel || "");

  useEffect(() => {
    setLabel(initialLabel || "");
  }, [initialLabel]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-node-modal"
      aria-describedby="edit-node-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxWidth: "100%",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Edit Node
        </Typography>
        <TextField
          label="Node Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave(label)}
            sx={{ marginRight: 1 }}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditNodeModal;
