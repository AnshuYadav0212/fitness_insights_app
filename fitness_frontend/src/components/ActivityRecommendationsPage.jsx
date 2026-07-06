import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateRecommendation, getActivityDetail } from "../services/api";

const ActivityRecommendationsPage = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userId);

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    improvements: "",
    safety: "",
    suggestions: "",
  });

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const response = await getActivityDetail(id);
      setActivity(response.data);
    } catch (error) {
      console.error("Failed to load activity:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const splitToArray = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        userId,
        activityId: id,
        improvements: splitToArray(form.improvements),
        safety: splitToArray(form.safety),
        suggestions: splitToArray(form.suggestions),
      };

      const response = await generateRecommendation(payload);
      setResult(response.data);
    } catch (error) {
      console.error("Recommendation generation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!activity) {
    return <Typography sx={{ mt: 4 }}>Activity not found.</Typography>;
  }

  return (
    <Box sx={{ mt: 2, display: "grid", gap: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recommendation Page
          </Typography>

          <Typography variant="h6">{activity.type}</Typography>
          <Typography>Duration: {activity.duration} min</Typography>
          <Typography>Calories: {activity.caloriesBurned}</Typography>
          <Typography>Time: {activity.startTime}</Typography>
          <Typography>
            Exercises: {activity.additionalMetrics?.exercises?.join(", ") || "N/A"}
          </Typography>
          <Typography>Sets: {activity.additionalMetrics?.sets ?? "N/A"}</Typography>
          <Typography>Reps: {activity.additionalMetrics?.reps ?? "N/A"}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Recommendation
          </Typography>

          <Box component="form" onSubmit={handleGenerate} sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Improvements (comma separated)"
              name="improvements"
              value={form.improvements}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Safety (comma separated)"
              name="safety"
              value={form.safety}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Suggestions (comma separated)"
              name="suggestions"
              value={form.suggestions}
              onChange={handleChange}
              fullWidth
            />

            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "Generating..." : "Generate Recommendation"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1">
              <strong>Recommendation:</strong> {result.recommendation}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Improvements:</strong> {result.improvements?.join(", ") || "N/A"}
            </Typography>
            <Typography><strong>Safety:</strong> {result.safety?.join(", ") || "N/A"}</Typography>
            <Typography>
              <strong>Suggestions</strong> {result.suggestions?.join(", ") || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityRecommendationsPage;