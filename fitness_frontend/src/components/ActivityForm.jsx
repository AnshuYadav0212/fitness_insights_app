import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
    const userId=useSelector((state)=>state.auth.userId);
    const [activity, setActivity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrics: {
                exercises: [""],
                sets: "",
                reps: "",
        },
    });

    const handleAdditionalMetricChange = (field, value) => {
        setActivity((prev) => ({
        ...prev,
        additionalMetrics: {
            ...prev.additionalMetrics,
            [field]: value,
        },
        }));
    };

    const handleExerciseChange = (index, value) => {
        setActivity((prev) => {
        const exercises = [...prev.additionalMetrics.exercises];
        exercises[index] = value;
        return {
            ...prev,
            additionalMetrics: {
            ...prev.additionalMetrics,
            exercises,
            },
        };
        });
    };

    const addExerciseField = () => {
        setActivity((prev) => ({
        ...prev,
        additionalMetrics: {
            ...prev.additionalMetrics,
            exercises: [...prev.additionalMetrics.exercises, ""],
        },
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const duration = Number(activity.duration);
        const caloriesBurned = Number(activity.caloriesBurned);
        const sets = Number(activity.additionalMetrics.sets);
        const reps = Number(activity.additionalMetrics.reps);
        const exercises = activity.additionalMetrics.exercises
            .map(e => e.trim())
            .filter(e => e.length > 0);

        if (exercises.length === 0) {
            alert("Please enter at least one exercise.");
            return;
        }

        if (!duration || duration <= 0) {
            alert("Duration must be greater than 0");
            return;
        }

        if (!caloriesBurned || caloriesBurned <= 0) {
            alert("Calories burned must be greater than 0");
            return;
        }

        if (sets <= 0) {
        alert("Sets must be greater than 0.");
        return;
    }

    if (reps <= 0) {
        alert("Reps must be greater than 0.");
        return;
    }

        const payload = {
            ...activity,
            userId: userId, 
            duration: Number(activity.duration),
            caloriesBurned: Number(activity.caloriesBurned),
            startTime: new Date().toISOString(),
            additionalMetrics: {
                exercises,
                sets,
                reps,
            },
            };
        try {
            await addActivity(payload);
            onActivityAdded();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '',startTime: new Date().toISOString(),
            additionalMetrics: {
            exercises: [""],
            sets: "",
            reps: "",
            },
         });
        } catch (error) {
            console.error("Add activity failed: ",error);
        }
    }
    
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
    <FormControl fullWidth sx={{mb: 2}}>
        <InputLabel>Activity Type</InputLabel>
        <Select
            value={activity.type}
            onChange={(e) => setActivity({...activity, type: e.target.value})}>
                <MenuItem value="RUNNING">Running</MenuItem>
                <MenuItem value="WALKING">Walking</MenuItem>
                <MenuItem value="CYCLING">Cycling</MenuItem>
                <MenuItem value="SWIMMING">Swimming</MenuItem>
                <MenuItem value="YOGA">Yoga</MenuItem>
                <MenuItem value="WEIGHTLIFTING">Weightlifting</MenuItem>
                <MenuItem value="CARDIO">Cardio</MenuItem>
                <MenuItem value="STRETCHING">Stretching</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
            </Select>
    </FormControl>
    <TextField fullWidth
                label="Duration (Minutes)"
                type='number'
                sx={{ mb: 2}}
                value={activity.duration}
                onChange={(e) => setActivity({...activity, duration: e.target.value})}/>

    <TextField fullWidth
                label="Calories Burned"
                type='number'
                sx={{ mb: 2}}
                value={activity.caloriesBurned}
                onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}/>

    {activity.additionalMetrics.exercises.map((exercise, index) => (
        <TextField
          key={index}
          fullWidth
          label={`Exercise ${index + 1}`}
          sx={{ mb: 2 }}
          value={exercise}
          onChange={(e) => handleExerciseChange(index, e.target.value)}
        />
      ))}

      <Button type="button" onClick={addExerciseField} sx={{ mb: 2 }}>
        Add Exercise
      </Button>

      <TextField
        fullWidth
        label="Sets"
        type="number"
        sx={{ mb: 2 }}
        value={activity.additionalMetrics.sets}
        onChange={(e) => handleAdditionalMetricChange("sets", e.target.value)}
      />

      <TextField
        fullWidth
        label="Reps"
        type="number"
        sx={{ mb: 2 }}
        value={activity.additionalMetrics.reps}
        onChange={(e) => handleAdditionalMetricChange("reps", e.target.value)}
      />

<Button type='submit' variant='contained'>
    Add Activity
</Button>
  </Box>
  )
}

export default ActivityForm