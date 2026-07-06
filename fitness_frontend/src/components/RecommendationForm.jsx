import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { addRecommendation } from "../services/api";

const RecommendationForm = ({ activityId, onSaved }) => {
  const userId = useSelector((state) => state.auth.userId);

  const [form, setForm] = useState({
    improvements: "",
    safety: "",
    suggestions: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      activityId,
      improvements: form.improvements
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      safety: form.safety
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      suggestions: form.suggestions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      await addRecommendation(payload);
      onSaved?.();
      setForm({
        improvements: "",
        safety: "",
        suggestions: "",
      });
    } catch (err) {
      console.error("Failed to add recommendation:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Recommendation
      </Typography>

      <TextField
        fullWidth
        label="Improvements (comma separated)"
        sx={{ mb: 2 }}
        value={form.improvements}
        onChange={(e) => setForm({ ...form, improvements: e.target.value })}
      />

      <TextField
        fullWidth
        label="Safety (comma separated)"
        sx={{ mb: 2 }}
        value={form.safety}
        onChange={(e) => setForm({ ...form, safety: e.target.value })}
      />

      <TextField
        fullWidth
        label="Suggestions (comma separated)"
        sx={{ mb: 2 }}
        value={form.suggestions}
        onChange={(e) => setForm({ ...form, suggestions: e.target.value })}
      />

      <Button type="submit" variant="contained">
        Save Recommendation
      </Button>
    </Box>
  );
};

export default RecommendationForm;