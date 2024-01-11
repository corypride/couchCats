package org.launchcode.couchcatbackend.configuration;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
@Configuration
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
            userRepository.save(user);
            return sessionId;
        }
        return null;
    }

    public boolean isValidSession(String sessionId) {
        User user = userRepository.findBySessionId(sessionId);
        if (user != null) {
                return true;
            }
        //}
        return false;
    }

    /* finds a user by their sessionId, if the user exists, method changes the sessionId to null*/
    public void invalidateSession(String sessionId) {
        User user = userRepository.findBySessionId(sessionId);
        if (user != null) {
            // Invalidate the session by resetting the session ID
            user.setSessionId(null);
            System.out.println(user.getSessionId());
            userRepository.save(user);
        }
    }
}

