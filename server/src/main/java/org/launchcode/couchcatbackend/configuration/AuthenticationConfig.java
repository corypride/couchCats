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

    //TODO: Implement a method that will run periodically for clearing expired sessions automatically after the maxInactiveInterval exceeds 20 min
    //global variable to set the max inactive interval for a session to 20 min
    public static final int maxInactiveInterval = 1200;

    /*HashMap to store session Ids as keys and latest activity time as the values for multiple users/sessions at a time.
        note that this in-memory storage is fine for our MVP but if we wanted to scale, we'd refactor to house this
        in our database so the data survives between application startups or across multiple servers*/
    //private static final Map<String, Long> sessionLastActivityTimes = new HashMap<>();

//    public static void updateLastActivityTime(String sessionId) {
//        sessionLastActivityTimes.put(sessionId, System.currentTimeMillis() / 1000);
//        for (Map.Entry<String, Long> sessionLastActivityTimes : sessionLastActivityTimes.entrySet()) {
//            System.out.println(sessionLastActivityTimes.getKey() + " (" + sessionLastActivityTimes.getValue() + ")");
//        }
//    }
    public String createSession(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Generate a random session ID
            String sessionId = UUID.randomUUID().toString();
            user.setSessionId(sessionId);
            // Regenerate session ID upon login to protect against session fixation
            userRepository.save(user);
            //updateLastActivityTime(sessionId); //adds sessionId and current time in seconds to the hashmap
            return sessionId;
        }
        return null;
    }

    public boolean isValidSession(String sessionId) {
        User user = userRepository.findBySessionId(sessionId);
        if (user != null) {
           // Long lastActivityTime = sessionLastActivityTimes.get(sessionId);
            //if (lastActivityTime != null && (System.currentTimeMillis()/1000 - lastActivityTime) < maxInactiveInterval) {
                return true;
            }
        //}
        return false;
    }

    /* finds a user by their sessionId, if the user exists, method changes the sessionId to null*/
    public void invalidateSession(String sessionId) {
        User user = userRepository.findBySessionId(sessionId);
        if (user != null) {
            //sessionLastActivityTimes.remove(sessionId); //removes session id from the last activity hashmap
            // Invalidate the session by resetting the session ID
            user.setSessionId(null);
            userRepository.save(user);
        }
    }
}

