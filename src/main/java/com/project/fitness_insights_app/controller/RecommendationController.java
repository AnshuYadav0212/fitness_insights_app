package com.project.fitness_insights_app.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.fitness_insights_app.dto.UserSummaryResponse;
import com.project.fitness_insights_app.model.Recommendation;
import com.project.fitness_insights_app.dto.RecommendationRequest;
import com.project.fitness_insights_app.service.ActivitySummaryService;
import com.project.fitness_insights_app.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/recommendation")
@RequiredArgsConstructor
class RecommendationController {
    private final RecommendationService recommendationService;
    private final ActivitySummaryService activitySummaryService;
    @PostMapping("/generate")
    public ResponseEntity<Recommendation> generateRecommendation(@RequestBody RecommendationRequest request) {
        Recommendation recommendation = recommendationService.generateRecommendation(request);
        return ResponseEntity.ok(recommendation);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>> getUserRecommendation(@PathVariable String userId) {
        List<Recommendation> recommendationList=
                recommendationService.getUserRecommendation(userId);
        return ResponseEntity.ok(recommendationList);
    }
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<Recommendation>> getActivityRecommendation(@PathVariable String activityId) {
        List<Recommendation> recommendationList=
                recommendationService.getActivityRecommendation(activityId);
        return ResponseEntity.ok(recommendationList);
    }
    @GetMapping("/user/{userId}/summary")
    public ResponseEntity<UserSummaryResponse> getUserSummary(@PathVariable String userId) throws JsonProcessingException {
        return ResponseEntity.ok(activitySummaryService.generateSummary(userId));
    }

}
