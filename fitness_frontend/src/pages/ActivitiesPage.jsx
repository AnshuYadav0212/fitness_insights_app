import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import { getAiSummaryRecommendation } from "../services/api";

const ActivitiesPage = () => {
  const userId = useSelector((state) => state.auth.userId);

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSummary, setShowSummary] = useState(false);


  const handleAiSummary = async () => {
    try {
      setLoading(true);
      setError("");
      if (!summary) {
      console.log("Calling AI summary for userId:", userId);

      const res = await getAiSummaryRecommendation(userId);
      console.log("AI summary response:", res.data);

      setSummary(res.data);
      }
      setShowSummary(true);
    } catch (err) {
      console.error("AI summary failed:", err);
      setError("Failed to load AI summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <ActivityForm onActivityAdded={() => window.location.reload()} />

      <Button
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleAiSummary}
        disabled={!userId || loading}
      >
        {loading ? "Loading AI Summary..." : "View AI Summary"}
      </Button>

      {!userId && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          userId is missing. Login state is not being stored correctly.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {summary && (
      <Button
        variant="outlined"
        onClick={() => setShowSummary(!showSummary)}
        sx={{ ml: 2, mb: 2 }}
      >
        {showSummary ? "▲" : "▼"}
        </Button>
        )}


     {summary && showSummary  && (
        <Card sx={{ mb: 3 }}>
            <CardContent>

            <Typography variant="h5" gutterBottom>
                AI Summary
            </Typography>

            <Typography variant="h6">
                Total Workouts
            </Typography>

            <Typography sx={{ mb: 2 }}>
                {summary.totalWorkouts}
            </Typography>

            <Typography variant="h6">
                Total Calories
            </Typography>

            <Typography sx={{ mb: 2 }}>
                {summary.totalCalories}
            </Typography>

            <Typography variant="h6">
                Total Duration
            </Typography>

            <Typography sx={{ mb: 2 }}>
                {summary.totalDuration} minutes
            </Typography>

            <Typography variant="h6">
                Overall Summary
            </Typography>

            <Typography sx={{ mb: 3 }}>
                {summary.overallSummary}
            </Typography>

            <Typography variant="h6">
                Improvements
            </Typography>

            <Box sx={{ mb: 3 }}>
                {summary.improvements?.map((item, index) => (
                <Typography key={index}>
                    • {item}
                </Typography>
                ))}
            </Box>

            <Typography variant="h6">
                Suggestions
            </Typography>

            <Box sx={{ mb: 3 }}>
                {summary.suggestions?.map((item, index) => (
                <Typography key={index}>
                    • {item}
                </Typography>
                ))}
            </Box>

            <Typography variant="h6">
                Safety Tips
            </Typography>

            <Box>
                {summary.safety?.map((item, index) => (
                <Typography key={index}>
                    • {item}
                </Typography>
                ))}
            </Box>

            </CardContent>
        </Card>
        )}

      <ActivityList />
    </Box>
  );
};

export default ActivitiesPage;