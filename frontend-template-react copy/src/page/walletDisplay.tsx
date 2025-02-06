import React, { useState } from "react";
import { useGetWalletByUserQuery, useCreditWalletMutation } from "../services/apiSlice";
import { Box, CircularProgress, Typography, Button, TextField, Alert, Card, CardContent, CardActions, Divider } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: "auto",
  background: "linear-gradient(135deg, #1a1a1a, #222222)",
  color: "#fff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 6px 15px rgba(255, 255, 255, 0.05)",
}));

const StyledButton = styled(Button)({
  marginTop: "12px",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: "bold",
  padding: "12px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
});

const WalletDisplay: React.FC = () => {
  const userID = localStorage.getItem("id");
  const { data: walletData, error, isLoading } = useGetWalletByUserQuery(userID || "");
  const wallet = Array.isArray(walletData) ? walletData[0] : walletData?.data || walletData;

  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [creditWallet, { isLoading: isCreditLoading, isError: isCreditError }] = useCreditWalletMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCredit = () => {
    if (creditAmount > 0) {
      creditWallet({ userId: userID, amount: creditAmount })
        .unwrap()
        .then(() => {
          setSuccessMessage(`Successfully credited $${creditAmount}`);
          setCreditAmount(0);
        })
        .catch((err) => console.error(err));
    }
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={5}>
        Error fetching wallet details
      </Typography>
    );

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Wallet Details
        </Typography>
        <Typography variant="body1" color="gray">User ID: {wallet?.userId}</Typography>
        <Typography variant="h6" color="primary" fontWeight="bold" mt={1}>
          Balance: ${wallet?.balance}
        </Typography>

        <Divider sx={{ my: 2, backgroundColor: "#444" }} />

        {successMessage && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Typography variant="body1" fontWeight="bold">
          Transactions:
        </Typography>
        <Box
          sx={{
            maxHeight: "150px",
            overflowY: "auto",
            padding: "12px",
            backgroundColor: "#292929",
            borderRadius: "8px",
            marginTop: 1,
            boxShadow: "inset 0 2px 6px rgba(255, 255, 255, 0.1)",
          }}
        >
          {wallet?.transactions?.length > 0 ? (
            wallet.transactions.map((transaction: any, index: number) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: transaction.type === "credit" ? "limegreen" : "#ff6961",
                  fontSize: "0.9rem",
                  padding: "4px 0",
                }}
              >
                {transaction.type.toUpperCase()}: ${transaction.amount} -{" "}
                {transaction.description}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="gray">
              No transactions available.
            </Typography>
          )}
        </Box>

        {/* Credit Input */}
        <TextField
          label="Amount to Credit"
          type="number"
          variant="outlined"
          fullWidth
          value={creditAmount}
          onChange={(e) => setCreditAmount(Number(e.target.value))}
          sx={{
            marginTop: 2,
            backgroundColor: "#2a2a2a",
            borderRadius: "8px",
            "& label": { color: "#bbb" },
            "& input": { color: "#fff" },
            "& fieldset": { borderColor: "#555" },
            "&:hover fieldset": { borderColor: "#888" },
          }}
        />
      </CardContent>

      <CardActions>
        <StyledButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCredit}
          disabled={isCreditLoading || creditAmount <= 0}
        >
          {isCreditLoading ? "Processing..." : "Add Money"}
        </StyledButton>
      </CardActions>

      {isCreditError && (
        <Typography color="error" sx={{ marginTop: 2, textAlign: "center" }}>
          Error occurred while crediting the wallet.
        </Typography>
      )}
    </StyledCard>
  );
};

export default WalletDisplay;
