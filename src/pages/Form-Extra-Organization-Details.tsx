import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Grid2,
  InputAdornment,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useRegisterFormStore } from "../store";
import { useNavigate } from "react-router";

const organizationDetailsFormSchema = z.object({
  numberOfEmployees: z.number().min(1, "يرجى تزويد عدد الموظفين"),
  numberOfBranches: z.number().min(1, "يرجى تزويد عدد الفروع"),
  identificationFile: z
    .custom<File>((file) => file instanceof File, "يرجى تحميل ملف صالح")
    .refine(
      (file) => file.size < 5 * 1024 * 1024,
      "يجب أن يكون حجم الملف أقل من 5 ميغابايت"
    ),
});

type FormFields = z.infer<typeof organizationDetailsFormSchema>;

function FormExtraOrganizationDetails() {
  const navigate = useNavigate();
  const { setExtraOrganizationDetails } = useRegisterFormStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormFields>({
    resolver: zodResolver(organizationDetailsFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setExtraOrganizationDetails(data);
      navigate("/form/next-step"); // Update with your next route
    } catch (error) {
      setError("root", { message: "حدث خطأ أثناء حفظ البيانات" });
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
          التفاصيل الإضافية للمنظمة
        </Typography>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="عدد الموظفين"
              type="number"
              variant="outlined"
              {...register("numberOfEmployees", { valueAsNumber: true })}
              error={!!errors.numberOfEmployees}
              helperText={errors.numberOfEmployees?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },

                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "primary.main" }}>
                    <span style={{ color: "white" }}>موظف</span>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="عدد الفروع"
              type="number"
              variant="outlined"
              {...register("numberOfBranches", { valueAsNumber: true })}
              error={!!errors.numberOfBranches}
              helperText={errors.numberOfBranches?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
                "& .MuiInputAdornment-root": { color: "white" },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "white" }}>
                    <span style={{ color: "white" }}>فرع</span>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Controller
              name="identificationFile"
              control={control}
              rules={{ required: "يرجى تحميل ملف هوية الشركة" }} // Validation rule
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.identificationFile}>
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    id="identificationFileInput"
                    onChange={(e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      field.onChange(file);
                    }}
                  />
                  <label htmlFor="identificationFileInput">
                    <Button
                      variant="outlined" // Change to outlined
                      component="span"
                      sx={{
                        borderColor: "primary.main", // Outline color
                        color: "primary.main", // Text color
                        "&:hover": {
                          bgcolor: "rgba(255, 215, 0, 0.1)", // Light gold hover effect
                        },
                        py: 1.5,
                        width: "100%",
                        fontWeight: "bold",
                      }}
                    >
                      تحميل ملف هوية الشركة
                    </Button>
                  </label>

                  {/* Show selected file name */}
                  {field.value && (
                    <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
                      {field.value.name}
                    </Typography>
                  )}

                  {/* Show validation error */}
                  {errors.identificationFile && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.identificationFile.message}
                    </Typography>
                  )}
                </FormControl>
              )}
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
              {isSubmitting ? "جاري الحفظ..." : "حفظ البيانات"}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default FormExtraOrganizationDetails;
