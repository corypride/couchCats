package org.launchcode.couchcatbackend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.launchcode.couchcatbackend.models.User;
import org.launchcode.couchcatbackend.models.dto.RegisterFormDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.POST})
@RequestMapping("test-api")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable int id) {
        return userRepository.findById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<String> testRegister(@RequestBody String requestBody){
        return new ResponseEntity<>("Yata", HttpStatus.OK);
    }
}