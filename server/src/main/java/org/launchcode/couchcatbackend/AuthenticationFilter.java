package org.launchcode.couchcatbackend;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.launchcode.couchcatbackend.controllers.UserController;
import org.launchcode.couchcatbackend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class AuthenticationFilter implements HandlerInterceptor {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserController userController;

    //TODO: Controller and method is in UserController, but will need to see if it works after you do the rest

    private List<String> whitelist = Arrays.asList(); //use this to define whitelisted pages
    //TODO: figure out how to define whitelisted pages when you are defining them in a REST API for the front end
    // and if this remains, create boolean method to use as if param in filter request method?
    // OR does the front end only send requests for secure pages and this is NOT needed?
    /* I think these are the whitelisted pages, not sure if this is comprehensive:
    / (home)
    /search
    /register
    /login
    /movie (shows search results for a single movie when you use autocomplete)
    /logout or whatever that redirects to once you are logged out? */


    //@Override
    protected void preHandler (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //authentication logic here
        if (isAuthenticated(request)) {
            // If authenticated, proceed with the filter chain
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // You can customize the unauthorized response, e.g., return a JSON response
            // response.getWriter().write("Unauthorized");
        }
    }

    private boolean isAuthenticated(HttpServletRequest request) {
        // Implement your authentication logic here
        // Check session ID or cookie and return true if authenticated, false otherwise
        // Example: return AuthenticationService.isAuthenticated(request);
        Cookie[] cookies = request.getCookies(); //need to fix this to be sessionId not cookies
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("sessionId".equals(cookie.getName()) && "validSessionId".equals(cookie.getValue())) {
                    return true;
                }
            }
        }
        return false;
    }
}

