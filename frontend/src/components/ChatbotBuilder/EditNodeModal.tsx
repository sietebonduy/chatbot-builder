import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [data, setData] = useState<T>({} as T);

  useEffect(() => {
    const initial = { ...initialData } as any;
    if (type === 'message') {
      initial.options = Array.isArray(initial.options)
        ? initial.options.map((opt: any) => ({
          id: opt.id || nanoid(),
          label: opt.label || "",
        }))
        : [];
    }
    setData(initial);
  }, [initialData, type]);

  const handleChange = (field: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value } as T));
  };

  const handleOptionChange = (index: number, key: "label") => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const options = [...((data as any).options || [])];
    options[index] = { ...options[index], [key]: e.target.value };
    setData((prev) => ({ ...prev, options } as T));
  };

  const addOption = () => {
    const options = Array.isArray((data as any).options)
      ? [...(data as any).options]
      : [];
    options.push({ id: nanoid(), label: "" });
    setData((prev) => ({ ...prev, options } as T));
  };

  const removeOption = (index: number) => {
    const options = [...((data as any).options || [])];
    options.splice(index, 1);
    setData((prev) => ({ ...prev, options } as T));
  };

  const handleSubmit = () => {
    onSave(data);
  };

  const capitalizedType =
    type.charAt(0).toUpperCase() + type.slice(1);

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
          {t('flow_builder.edit_node_modal.edit_node_title', { type: capitalizedType })}
        </Typography>

        <TextField
          label={ t('flow_builder.edit_node_modal.label') }
          value={data.label || ""}
          onChange={handleChange("label" as keyof T)}
          fullWidth
          margin="normal"
          multiline
          rows={5}
          maxRows={10}
        />

        {type === "message" && (
          <>
            {/*<TextField*/}
            {/*  label="Text"*/}
            {/*  value={(data as any).text || ""}*/}
            {/*  onChange={handleChange("text" as keyof T)}*/}
            {/*  fullWidth*/}
            {/*  multiline*/}
            {/*  minRows={3}*/}
            {/*  margin="normal"*/}
            {/*/>*/}

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              { t('flow_builder.edit_node_modal.buttons') }
            </Typography>
            {(data as any).options?.map(
              (opt: any, idx: number) => (
                <Box
                  key={opt.id}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <TextField
                    label={ t('flow_builder.edit_node_modal.label') }
                    value={opt.label}
                    onChange={handleOptionChange(idx, 'label')}
                    size="small"
                    fullWidth
                  />
                  <IconButton
                    aria-label="Remove option"
                    size="small"
                    onClick={() => removeOption(idx)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )
            )}
            <Button
              startIcon={<Add />}
              onClick={addOption}
              size="small"
            >
              { t('flow_builder.edit_node_modal.add_button') }
            </Button>
          </>
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

        {/* ... остальные поля для textInput, condition, apiCall */}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            { t('flow_builder.edit_node_modal.cancel') }
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            { t('flow_builder.edit_node_modal.save') }
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditNodeModal;