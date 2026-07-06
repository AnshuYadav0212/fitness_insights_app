package com.project.fitness_insights_app.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.fitness_insights_app.dto.UserSummaryResponse;
import com.project.fitness_insights_app.model.Activity;
import com.project.fitness_insights_app.repository.ActivityRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class ActivitySummaryService {

    private final ActivityRepository activityRepository;
    private final ChatClient chatClient;

    public ActivitySummaryService(ActivityRepository activityRepository, ChatClient.Builder chatClientBuilder) {
        this.activityRepository = activityRepository;
        this.chatClient = chatClientBuilder.build();
    }

    @Cacheable(cacheNames = "userSummaryCache", key = "#userId")
    public UserSummaryResponse generateSummary(String userId) throws JsonProcessingException {
        List<Activity> activities = activityRepository.findByUserId(userId);

        if (activities.isEmpty()) {
            return new UserSummaryResponse(0,0,0,"No activity data available for summary!",List.of(),List.of(),List.of());
        }

        int totalCalories = activities.stream()
                .mapToInt(a -> a.getCaloriesBurned() == null ? 0 : a.getCaloriesBurned())
                .sum();

        int totalDuration = activities.stream()
                .mapToInt(a -> a.getDuration() == null ? 0 : a.getDuration())
                .sum();

        Map<String, Long> breakdown = activities.stream()
                .collect(Collectors.groupingBy(a -> a.getType().name(), Collectors.counting()));

        String promptText = """
                You are a fitness assistant.
                Below are aggregated user statistics.
                Return ONLY valid JSON.
                
                The JSON MUST exactly match this schema:
                
                {
                  "overallSummary": "string",
                  "improvements": [
                    "string"
                  ],
                  "suggestions": [
                    "string"
                  ],
                  "safety": [
                    "string"
                  ]
                }
                
                Rules:
                
                - Return valid JSON only.
                Do not return markdown.
                Do not use ```json.
                Keep it concise. Do not invent facts at most 3 points for each also improvments,suggestions,safety are List of String.
                """;

        String summary = chatClient.prompt()
                .user(promptText)
                .call()
                .content();
        assert summary != null;
        summary = summary
                .replace("```json", "")
                .replace("```", "")
                .trim();
        ObjectMapper mapper = new ObjectMapper();


        AiSummaryResponse aiSummary =
                mapper.readValue(summary, AiSummaryResponse.class);

        return new UserSummaryResponse( activities.size(),totalCalories, totalDuration, aiSummary.getOverallSummary(),
                aiSummary.getImprovements(), aiSummary.getSuggestions(), aiSummary.getSafety());
    }
}
