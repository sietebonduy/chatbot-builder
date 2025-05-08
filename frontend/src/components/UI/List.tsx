import React from "react";
import {
  Typography,
  Card,
  CardContent,
  List as MuiList,
  Divider,
  Box,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {present} from "../../utils/presence.ts";

const List = ({ pageTitle, data, renderItem, onView, onEdit, onDelete }) => {
  return (
    <Box maxWidth="md" mx="auto" my={4}>
      { present(pageTitle) ? <Typography variant="h4" gutterBottom>{pageTitle}</Typography> : null }

      <MuiList>
        {data.map((item, index) => (
          <React.Fragment key={item.id || index}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>{renderItem ? renderItem(item) : JSON.stringify(item)}</Box>

                  <Stack direction="row" spacing={1}>
                    {onView && (
                      <Tooltip title="Просмотр">
                        <IconButton onClick={() => onView(item)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onEdit && (
                      <Tooltip title="Редактировать">
                        <IconButton onClick={() => onEdit(item)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title="Удалить">
                        <IconButton onClick={() => onDelete(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            {index < data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </MuiList>
    </Box>
  );
};

export default List;
