package com.project.fitness_insights_app.controller;

import com.project.fitness_insights_app.dto.LoginRequest;
import com.project.fitness_insights_app.dto.LoginResponse;
import com.project.fitness_insights_app.dto.RegisterRequest;
import com.project.fitness_insights_app.dto.UserResponse;
import com.project.fitness_insights_app.model.User;
import com.project.fitness_insights_app.security.JwtUtils;
import com.project.fitness_insights_app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(userService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        Authentication authentication;
        try {

            User user =userService.authenticate(loginRequest);

            String token= jwtUtils.generateToken(user.getId(),user.getRole().name());

            return ResponseEntity.ok(new LoginResponse(
                    token,userService.mapToResponse(user)
            ));
        } catch (AuthenticationException e){
            e.printStackTrace();
            return ResponseEntity.status(401).build();
        }
    }
}
