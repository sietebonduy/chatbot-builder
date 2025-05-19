import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

export interface EditNodeModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  type: "message" | "button" | "textInput" | "condition" | "apiCall" | "trigger";
  initialData: Partial<T>;
  onSave: (data: T) => void;
}

const EditNodeModal = <T extends Record<string, any>>({
                                                        isOpen,
                                                        onClose,
                                                        type,
                                                        initialData,
                                                        onSave,
                                                      }: EditNodeModalProps<T>) => {
  const [data, setData] = useState<T>({} as T);

  useEffect(() => {
    setData({ ...initialData } as T);
  }, [initialData, type]);

  const handleChange = (field: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value } as T));
  };

  const handleSubmit = () => {
    onSave(data);
  };

  const capitalizedType = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "";

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-node-modal"
      aria-describedby="edit-node-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxWidth: "100%",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {`Edit ${capitalizedType} Node`}
        </Typography>

        <TextField
          label="Label"
          value={data.label || ""}
          onChange={handleChange("label" as keyof T)}
          fullWidth
          margin="normal"
        />

        {type === "message" && (
          <TextField
            label="Text"
            value={(data as any).text || ""}
            onChange={handleChange("text" as keyof T)}
            fullWidth
            multiline
            minRows={3}
            margin="normal"
          />
        )}

        {type === "button" && (
          <TextField
            label="Buttons (JSON array)"
            value={JSON.stringify((data as any).buttons || [], null, 2)}
            onChange={handleChange("buttons" as keyof T)}
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            helperText='Пример: [{ "label": "Yes", "targetNodeId": "node1" }]'
          />
        )}

        {type === "textInput" && (
          <>
            <TextField
              label="Placeholder"
              value={(data as any).placeholder || ""}
              onChange={handleChange("placeholder" as keyof T)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Variable Name"
              value={(data as any).variableName || ""}
              onChange={handleChange("variableName" as keyof T)}
              fullWidth
              margin="normal"
            />
          </>
        )}

        {type === "condition" && (
          <TextField
            label="Expression"
            value={(data as any).expression || ""}
            onChange={handleChange("expression" as keyof T)}
            fullWidth
            margin="normal"
            helperText="Например: {{answer}} > 10"
          />
        )}

        {type === "apiCall" && (
          <>
            <TextField
              label="URL"
              value={(data as any).url || ""}
              onChange={handleChange("url" as keyof T)}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Method"
              value={(data as any).method || "GET"}
              onChange={handleChange("method" as keyof T)}
              fullWidth
              margin="normal"
            >
              {["GET", "POST", "PUT", "DELETE"].map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Body (JSON)"
              value={(data as any).body || ""}
              onChange={handleChange("body" as keyof T)}
              fullWidth
              multiline
              minRows={3}
              margin="normal"
              helperText="Опционально: JSON-тело запроса"
            />
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditNodeModal;
