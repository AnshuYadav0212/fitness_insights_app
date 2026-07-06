import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Grid container spacing={2}>
      {activities.map((activity, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Activity #{index + 1}
              </Typography>

              <Typography variant="h6">{activity.type}</Typography>
              <Typography>Duration: {activity.duration} min</Typography>
              <Typography>Calories: {activity.caloriesBurned}</Typography>
              <Typography>Time: {activity.startTime}</Typography>

              <Typography>
                Exercises: {activity.additionalMetrics?.exercises?.join(", ") || "N/A"}
              </Typography>
              <Typography>
                Sets: {activity.additionalMetrics?.sets ?? "N/A"}
              </Typography>
              <Typography>
                Reps: {activity.additionalMetrics?.reps ?? "N/A"}
              </Typography>

              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                

                <Button
                  variant="contained"
                  onClick={() => navigate(`/recommendation/${activity.id}`)}
                >
                  Recommendation
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;