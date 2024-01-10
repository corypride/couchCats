package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.configuration.AuthenticationConfig;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.dto.UserDetailsDTO;
import org.launchcode.couchcatbackend.services.UserService;
import org.launchcode.couchcatbackend.utils.HTTPResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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

    //OPTION A:
    @PostMapping(value = "/secure", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> secureEndpoint(
            @RequestBody Map<String, Object> requestBody,
            @CookieValue(name = "sessionId", required = false) String sessionId) {
        User retrievedUser = userRepository.findBySessionId(sessionId);
        Integer id = (Integer) requestBody.get("id");
        if (retrievedUser != null && id != null) {
            Optional<User> providedUser = userRepository.findById(id);
            if (providedUser.isPresent() && retrievedUser.equals(providedUser.get())) {
                return HTTPResponseBuilder.ok("Session is valid.");
            } else {
                return HTTPResponseBuilder.badRequest("Invalid credentials.");
            }
        }
        return HTTPResponseBuilder.badRequest("Credentials not found.");

    }

    //OPTION B:
    @GetMapping("/secure/{id}")
    public ResponseEntity<String> secureGetEndpoint(
            @PathVariable Integer id,
            @CookieValue(name = "sessionId", required = false) String sessionId) {
        User retrievedUser = userRepository.findBySessionId(sessionId);
        if (retrievedUser != null && id != null) {
            Optional<User> providedUser = userRepository.findById(id);
            if (providedUser.isPresent() && retrievedUser.equals(providedUser.get())) {
                return HTTPResponseBuilder.ok("Session is valid.");
            } else {
                return HTTPResponseBuilder.badRequest("Invalid credentials.");
            }
        }
        return HTTPResponseBuilder.badRequest("Credentials not found.");

    }

    @PostMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> logoutUser(@CookieValue(name = "sessionId", required = false) String sessionId) {
        if (sessionId == null || sessionId.isEmpty()) {
            return HTTPResponseBuilder.badRequest("Invalid session ID");
        } else {
            return userService.logoutUser(sessionId);
        }
    }
}

//    //  TODO: VALIDATE THIS METHOD IS ACTUALLY NOT NEEDED AND DELETE IF SO, IF IT IS NEEDED, REPLACE USERDTO WITH USER and Delete UserDTO
/*NOTES: 1. this uses the URI I set when the user registers "/user/{id}" (no "details), which is what the front end would
pass back to retrieve the information
*/
//@GetMapping("/{id}")
//public ResponseEntity<UserDetailsDTO> getUserDetailsById(@PathVariable Integer id) {
//    Optional<User> result = userRepository.findById(id);
//    if (result.isPresent()) {
//        User user = result.get();
//        UserDetailsDTO userDetailsDTO = new UserDetailsDTO(user.getFirstName(), user.getLastName(), user.getEmail());
//        return ResponseEntity.ok().body(userDetailsDTO);
//    }
//    return ResponseEntity.notFound().build();
//}
//}





