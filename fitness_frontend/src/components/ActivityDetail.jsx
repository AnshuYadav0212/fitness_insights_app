import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const response = await getActivityDetail(id);
      setActivity(response.data);
    } catch (error) {
      console.error("Failed to fetch activity detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [id]);

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
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Activity Detail
        </Typography>

        <Typography variant="h6">{activity.type}</Typography>
        <Typography>User ID: {activity.userId}</Typography>
        <Typography>Duration: {activity.duration} min</Typography>
        <Typography>Calories: {activity.caloriesBurned}</Typography>
        <Typography>Start Time: {activity.startTime}</Typography>
        <Typography>Created At: {activity.createdAt}</Typography>
        <Typography>Updated At: {activity.updatedAt}</Typography>

        <Typography sx={{ mt: 2 }}>
          Exercises: {activity.additionalMetrics?.exercises?.join(", ") || "N/A"}
        </Typography>
        <Typography>Sets: {activity.additionalMetrics?.sets ?? "N/A"}</Typography>
        <Typography>Reps: {activity.additionalMetrics?.reps ?? "N/A"}</Typography>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate(`/recommendation/${id}`)}
        >
          Add Recommendation
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityDetail;