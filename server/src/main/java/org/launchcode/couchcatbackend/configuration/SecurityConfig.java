import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/user/register").permitAll() // Allow registration without authentication
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .permitAll()
                .and()
                .csrf().disable(); /* Disable CSRF (Cross Site Forgery) for simplicity since we won't be in a production environment
                                     (this prevents a malicious request, i.e. a script to change a password,
                                     that has session ID so the request looks legit, but is not)
                                     if we want to enable it, we can; wanted to collaborate with Merve before doing so
                                     because it requires some work on the front end as well to include CSRF token in
                                     the headers of every request, but you can use fetch or axios to retrieve the cookie
                                      so may not be a big deal
    }

}