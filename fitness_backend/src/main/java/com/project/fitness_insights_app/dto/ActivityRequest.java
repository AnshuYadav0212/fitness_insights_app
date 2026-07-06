package com.project.fitness_insights_app.dto;

import com.project.fitness_insights_app.model.ActivityType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequest {
    private String id;
    @NotNull
    private String userId;
    @NotNull
    private ActivityType type;
    @Valid
    @NotNull
    @Size(min = 3)
    private Map<String,Object> additionalMetrics;
    @Positive(message = "Duration must be greater than 0")
    private Integer duration;
    @Positive(message = "Calories burned must be greater than 0")
    private Integer caloriesBurned;
    private LocalDateTime startTime;
}

