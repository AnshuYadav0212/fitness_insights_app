package com.project.fitness_insights_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserSummaryResponse {
    private int totalWorkouts;

    private int totalCalories;

    private int totalDuration;

    private String overallSummary;

    private List<String> improvements;

    private List<String> suggestions;

    private List<String> safety;

}