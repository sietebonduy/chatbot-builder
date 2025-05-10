import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { update } from '@/api/repositories/UserRepositroy'
import { IUpdateUserParam } from "@/types/user.ts";
import { normalizeFromJsonApi } from "@/lib/normalizeUser.ts";
import { useUserStore } from "@/stores/userStore.ts";

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  locale: yup.string().required("Locale is required"),
});

const UserProfileForm = ({ user, avatar, setAvatar, fileInputRef, handleAvatarChange }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      locale: "en",
      timezone: "",
    },
  });

  const onSubmit = async (params: IUpdateUserParams) => {
    const formData = new FormData();

    formData.append("first_name", params.firstName);
    formData.append("last_name", params.lastName);
    formData.append("email", params.email);
    formData.append("locale", params.locale);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await update(user.id, formData);
      const normalized = normalizeFromJsonApi(response.data.data);
      useUserStore.getState().setUser(normalized);
      toast.success("User profile updated successfully.");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <Card className="flex-1 md:w-2/3">
          <CardHeader title="Personal Information" />
          <Divider />
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar
                src={avatar ? URL.createObjectURL(avatar) : user.avatarUrl}
                className="w-16 h-16"
              />
              <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                Change Avatar
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>

            <div>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            <div>
              <Typography variant="subtitle2" gutterBottom>Language</Typography>
              <Select
                fullWidth
                defaultValue={user.locale || "ru"}
                {...register("locale")}
                error={!!errors.locale}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ru">Русский</MenuItem>
              </Select>
              {errors.locale && (
                <Typography color="error" variant="caption">{errors.locale.message}</Typography>
              )}
            </div>

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

export default UserProfileForm;
