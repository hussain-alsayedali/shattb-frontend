import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { Outlet, useLocation } from "react-router";

const steps = [
  { label: "تفاصيل المنظمة", path: "organization" },
  { label: "تفاصيل المستخدم", path: "user" },
  { label: "تفاصيل نهائية", path: "extra-organization-details" },
];

export default function FormStepper() {
  const location = useLocation();

  const activeStep = steps.findIndex(
    (step) => location.pathname === `/form/${step.path}`
  );

  return (
    <Box sx={{ maxWidth: "md", mx: "auto", p: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((step) => (
          <Step key={step.path}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Outlet />
    </Box>
  );
}
