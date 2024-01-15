package org.launchcode.couchcatbackend.controllers;

import jakarta.transaction.Transactional;
import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.launchcode.couchcatbackend.data.UserMovieLogRepository;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.Movie;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.UserMovieLog;
import org.launchcode.couchcatbackend.services.UserService;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMovieLogRepository userMovieLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationConfig authenticationConfig;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> userLogin(@RequestBody User user) {
        return userService.authenticateUser(user);
    }

    @GetMapping("/secure/{id}")
    public ResponseEntity<String> secureGetEndpoint(
            @PathVariable Integer id,
            @CookieValue(name = "sessionId", required = false) String sessionId) {
        return userService.autheticateSession(id, sessionId);
    }

    @PostMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> logoutUser(@CookieValue(name = "sessionId", required = false) String sessionId) {
            return userService.logoutUser(sessionId);
    }
    @DeleteMapping
    @Transactional
    public ResponseEntity<String> deleteUser(@CookieValue(name = "sessionId", required = false) String sessionId) {
//        Optional<User> result = userRepository.findById(id);
        if (sessionId == null || sessionId.isEmpty()) {
            return HTTPResponseBuilder.badRequest("Invalid session ID");
        } else {
            User user = userRepository.findBySessionId(sessionId);
            System.out.println("user: " + user);
            int id = user.getId();
            String email = user.getEmail();

            List<Movie> watchlist = new ArrayList<>(user.getWatchlist());

            for (Movie movie : watchlist) {
                user.removeFromWatchlist(movie);
            }

            List<UserMovieLog> logEntries = userMovieLogRepository.findByIdUserId(id);
            for (UserMovieLog log : logEntries) {
                userMovieLogRepository.delete(log);
            }

            userRepository.save(user);
            userService.logoutUser(sessionId);
            userRepository.deleteById(id);
            //From Erin: ensures we also expire the cookie in the browser as well within the response,
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, "sessionId=; Max-Age=0; HttpOnly; SameSite=None; Secure");
            return HTTPResponseBuilder.ok("The account associated with email address " + email + " was deleted.", headers);
        }
    }
}