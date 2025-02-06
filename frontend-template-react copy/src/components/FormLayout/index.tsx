// src/components/FormLayout.tsx
import React from "react";
import { Box, Paper, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { motion } from "framer-motion"; // Import motion
import theme from "../../theme";

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitButtonText: string;
  linkText: string;
  linkHref: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  onSubmit,
  submitButtonText,
  linkText,
  linkHref,
  
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "transparent",
        
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial state (faded in and slightly above)
        animate={{ opacity: 1, y: 0 }}   // Final state (fully visible and in place)
        transition={{ duration: 0.6 }}    // Duration of the animation
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            maxWidth: 400,
            border: "2px solid #ccc",
            width: "100%",
            borderRadius: 2,
            backgroundColor: "#fff",
            
          }}
        >
          <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: theme.palette.secondary.main , fontWeight: "bold"}}>
            {title}
          </Typography>
          <Card sx={{ padding: 2, boxShadow: 5 }}>
            <CardContent>
              <form onSubmit={onSubmit}>
                {children}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": { backgroundColor: theme.palette.secondary.main },
                  }}
                  type="submit"
                >
                  {submitButtonText}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {linkText} <a href={linkHref}>{linkHref.includes("login") ? "Login" : "Sign up"}</a>
            </Typography>
          </Grid>
        </Paper>
      </motion.div>
     </Box>
  );
};

export default FormLayout;
