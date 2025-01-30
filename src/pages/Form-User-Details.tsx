import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid2,
} from "@mui/material";
import { useRegisterFormStore } from "../store";
import { useNavigate } from "react-router";

const UserDetailsFormSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("بريد إلكتروني غير صالح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  phoneNumber: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
});

type FormFields = z.infer<typeof UserDetailsFormSchema>;

function FormUserDetails() {
  const navigate = useNavigate();

  const { setUserDetails } = useRegisterFormStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(UserDetailsFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserDetails(data);
      navigate("/form/extra-organization-details"); // Navigate to next step

      console.log("User data saved to Zustand store");
    } catch (error) {
      setError("root", {
        message: "حدث خطأ أثناء حفظ البيانات",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: "secondary.main",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "primary.main", mb: 4 }}
        >
          تفاصيل المستخدم
        </Typography>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="البريد الإلكتروني"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="كلمة المرور"
              type="password"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="رقم الهاتف"
              variant="outlined"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
              inputProps={{ style: { direction: "ltr" } }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "#a67425" },
                color: "secondary.main",
                fontWeight: "bold",
                py: 2,
              }}
            >
              {isSubmitting ? "جاري الحفظ..." : "التالي"}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default FormUserDetails;
