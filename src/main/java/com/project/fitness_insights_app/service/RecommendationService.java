package com.project.fitness_insights_app.service;

import com.project.fitness_insights_app.model.Activity;
import com.project.fitness_insights_app.model.Recommendation;
import com.project.fitness_insights_app.model.User;
import com.project.fitness_insights_app.dto.RecommendationRequest;
import com.project.fitness_insights_app.repository.ActivityRepository;
import com.project.fitness_insights_app.repository.RecommendationRepository;
import com.project.fitness_insights_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    public final UserRepository userRepository;
    public final ActivityRepository activityRepository;
    public final RecommendationRepository recommendationRepository;

    public Recommendation generateRecommendation(RecommendationRequest recommendationRequest) {
        User user=userRepository.findById(recommendationRequest.getUserId())
                .orElseThrow(()->new RuntimeException("user not found: "+recommendationRequest.getUserId()));

        Activity activity=activityRepository.findById(recommendationRequest.getActivityId())
                .orElseThrow(()->new RuntimeException("activity not found: "+recommendationRequest.getActivityId()));


        Recommendation recommendation=Recommendation.builder()
                .user(user)
                .activity(activity)
                .improvements(recommendationRequest.getImprovements())
                .safety(recommendationRequest.getSafety())
                .suggestions(recommendationRequest.getSuggestions())
                .build();

        return recommendationRepository.save(recommendation);

    }

    public List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public List<Recommendation> getActivityRecommendation(String activityId) {
        return recommendationRepository.findByActivityId(activityId);
    }
}
