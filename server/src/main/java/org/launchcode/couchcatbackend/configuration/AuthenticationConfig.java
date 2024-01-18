package org.launchcode.couchcatbackend.configuration;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
@Configuration
public class AuthenticationConfig {
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //creates the sessionId value at login, we change sessionId at logout to null
    // and regenerate session ID upon login to protect against session fixation
    public String createSession(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Generate a random session ID using UUID (Universal Unique Identifier)
            String sessionId = UUID.randomUUID().toString();
            user.setSessionId(sessionId);
            userRepository.save(user);
            return sessionId;
        }
        return null;
    }

    //returns a boolean based on if a user is found by the sessionId passed
    public boolean isValidSession(String sessionId) {
        User user = userRepository.findBySessionId(sessionId);
        if (user != null) {
                return true;
            }
        return false;
    }

    /* finds a user by their sessionId, if the user exists, method changes the sessionId to null to invalidate session*/
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

