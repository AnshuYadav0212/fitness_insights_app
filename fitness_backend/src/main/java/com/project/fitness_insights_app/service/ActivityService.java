package com.project.fitness_insights_app.service;

import com.project.fitness_insights_app.model.Activity;
import com.project.fitness_insights_app.model.User;
import com.project.fitness_insights_app.dto.ActivityRequest;
import com.project.fitness_insights_app.dto.ActivityResponse;
import com.project.fitness_insights_app.repository.ActivityRepository;
import com.project.fitness_insights_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    @CacheEvict(cacheNames = "userSummaryCache", key = "#activityRequest.userId")
    public ActivityResponse trackActivity(ActivityRequest activityRequest) {
        User user=userRepository.findById(activityRequest.getUserId())
                .orElseThrow(()-> new RuntimeException("User not found :" + activityRequest.getUserId()));

        Activity activity=Activity.builder()
                .type(activityRequest.getType())
                .duration(activityRequest.getDuration())
                .caloriesBurned(activityRequest.getCaloriesBurned())
                .startTime(activityRequest.getStartTime())
                .additionalMetrics(activityRequest.getAdditionalMetrics())
                .user(user)
                .build();
        Activity savedActivity=  activityRepository.save(activity);
        return mapToResponse(savedActivity);
    }
    private ActivityResponse mapToResponse(Activity activity) {
        ActivityResponse activityResponse = new ActivityResponse();
        activityResponse.setId(activity.getId());
        activityResponse.setUserId(activity.getUser().getId());
        activityResponse.setType(activity.getType());
        activityResponse.setDuration(activity.getDuration());
        activityResponse.setCaloriesBurned(activity.getCaloriesBurned());
        activityResponse.setStartTime(activity.getStartTime());
        activityResponse.setAdditionalMetrics(activity.getAdditionalMetrics());
        activityResponse.setCreatedAt(activity.getCreatedAt());
        activityResponse.setUpdatedAt(activity.getUpdatedAt());
        return activityResponse;
    }

    public List<ActivityResponse> getUserActivities(String userId) {
          List<Activity> activityList=activityRepository.findByUserId(userId);
          return activityList.stream()
                  .map(this::mapToResponse)
                  .collect(Collectors.toList());
    }
}
