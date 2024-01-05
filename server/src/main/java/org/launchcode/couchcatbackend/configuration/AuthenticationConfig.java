package org.launchcode.couchcatbackend.configuration;

import jakarta.servlet.http.HttpSession;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

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


    public boolean isValidSession(String email, String sessionId) {
        User user = userRepository.findByEmail(email);
        return user != null && sessionId.equals(user.getSessionId());
    }

    //TODO: Fix to find a user by email and then get session Id -- this is pulling the wrong sessionId currently
    // -- was using a Get to get user details and pulled sessionId from a totally different user

    /* finds a user by their sessionId, if the user exists, method changes the sessionId to null,
    updates the user and returns this boolean as true, otherwise it returns false*/
    public boolean invalidateSession(String sessionId) {
        User user = userRepository.findBySessionId(sessionId);
        if (user != null) {
            // Invalidate the session by resetting the session ID
            user.setSessionId(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}

