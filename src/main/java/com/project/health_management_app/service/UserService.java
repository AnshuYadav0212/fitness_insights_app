package com.project.health_management_app.service;

import com.project.health_management_app.Model.Activity;
import com.project.health_management_app.Model.User;
import com.project.health_management_app.dto.RegisterRequest;
import com.project.health_management_app.dto.UserResponse;
import com.project.health_management_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public UserResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("User already exists with email: " + registerRequest.getEmail());
        }

        //builder is scalable and can be used without change even when new field added in database
        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .build();

        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }


    private UserResponse mapToResponse(User savedUser){
        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setCreatedAt(savedUser.getCreatedAt().toString());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt().toString());
        return userResponse;
    }
}
