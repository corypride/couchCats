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

public class AuthenticationFilter implements HandlerInterceptor {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserController userController;

    //@Override
    protected void preHandler (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Your authentication logic here
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
        // Example: return someAuthenticationService.isAuthenticated(request);
        Cookie[] cookies = request.getCookies();
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

