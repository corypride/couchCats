package org.launchcode.couchcatbackend.controllers;

import org.launchcode.couchcatbackend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;
}
