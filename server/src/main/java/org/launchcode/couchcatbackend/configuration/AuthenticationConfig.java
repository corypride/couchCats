package org.launchcode.couchcatbackend.configuration;

import jakarta.servlet.http.HttpSession;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class AuthenticationConfig {
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String createSession(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Generate a random session ID
            String sessionId = UUID.randomUUID().toString();
            user.setSessionId(sessionId);
            // Regenerate session ID upon login to protect against session fixation
            user.setSessionId(UUID.randomUUID().toString());
            userRepository.save(user);
            return sessionId;
        }
        return null;
    }

    public boolean isValidSession(String username, String sessionId) {
        User user = userRepository.findByEmail(username);
        return user != null && sessionId.equals(user.getSessionId());
    }
}