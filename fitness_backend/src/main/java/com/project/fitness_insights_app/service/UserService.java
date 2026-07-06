package com.project.fitness_insights_app.service;

import com.project.fitness_insights_app.dto.LoginRequest;
import com.project.fitness_insights_app.model.User;
import com.project.fitness_insights_app.dto.RegisterRequest;
import com.project.fitness_insights_app.dto.UserResponse;
import com.project.fitness_insights_app.model.UserRole;
import com.project.fitness_insights_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("User already exists with email: " + registerRequest.getEmail());
        }
        UserRole role=registerRequest.getRole() != null ?registerRequest.getRole(): UserRole.USER;
        //builder is scalable and can be used without change even when new field added in database
        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    public UserResponse mapToResponse(User savedUser){
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
    public User authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if(user==null){
            throw new RuntimeException("Invalid email or password");
        }

        if(!passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
}
