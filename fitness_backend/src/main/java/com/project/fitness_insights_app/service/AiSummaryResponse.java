package com.project.fitness_insights_app.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiSummaryResponse {
    private String overallSummary;

    private List<String> improvements;

    private List<String> suggestions;

    private List<String> safety;
}
