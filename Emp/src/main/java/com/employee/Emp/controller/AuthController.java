package com.employee.Emp.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.employee.Emp.Securityconfig.JwtUtil;
import com.employee.Emp.model.AuditLog;
import com.employee.Emp.model.AuthRequest;
import com.employee.Emp.model.AuthResponse;
import com.employee.Emp.model.User;
import com.employee.Emp.repository.AuditLogRepository;
import com.employee.Emp.repository.UserRepository;
import com.employee.Emp.service.LoginAttemptService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        String username = request.getUsername();

        if (loginAttemptService.isBlocked(username)) {
            int attempts = loginAttemptService.getAttempts(username);
            auditLogRepository.save(new AuditLog(username, "LOGIN_BLOCKED", new Date(), attempts));
            return ResponseEntity.status(403).body("User is blocked due to too many failed login attempts");
        }

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, request.getPassword())
            );

            loginAttemptService.loginSucceeded(username);

            User user = userRepository.findByUsername(username);
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

            auditLogRepository.save(new AuditLog(username, "LOGIN_SUCCESS", new Date(), 0));
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException e) {
            loginAttemptService.loginFailed(username);
            int attempts = loginAttemptService.getAttempts(username);
            auditLogRepository.save(new AuditLog(username, "LOGIN_FAILED", new Date(), attempts));
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        auditLogRepository.save(new AuditLog(username, "LOGOUT", new Date(), 0));
        return ResponseEntity.ok("Logged out");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest request) {
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        String role = request.getRole();
        if (role == null || role.isEmpty()) {
            role = "ROLE_USER";
        } else if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role.toUpperCase();
        }

        User newUser = new User(
            request.getUsername(),
            passwordEncoder.encode(request.getPassword()),
            role
        );

        userRepository.save(newUser);

        String token = jwtUtil.generateToken(newUser.getUsername(), newUser.getRole());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
