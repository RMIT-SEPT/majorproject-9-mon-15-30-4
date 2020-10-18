package com.sept.majorproject.group09.mon.sbbackend.security;


import com.sept.majorproject.group09.mon.sbbackend.services.AccountDetailsService;
import com.sept.majorproject.group09.mon.sbbackend.services.AdminService;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;
import com.sept.majorproject.group09.mon.sbbackend.tokenization.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
    public static final String ROLE_EMPLOYEE = "EMPLOYEE";
    public static final String ROLE_CUSTOMER = "CUSTOMER";
    public static final String ROLE_ADMIN = "ADMIN";

    @Autowired
    EmployeeService employeeService;

    @Autowired
    CustomerService customerService;

    @Autowired
    AdminService adminService;

    @Autowired
    AccountDetailsService accountDetailsService;

    @Autowired
    JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .headers().frameOptions().sameOrigin() //To enable H2 Database
                .and()
                .authorizeRequests()
                //CUSTOMER ONLY
                .antMatchers("/api/login/isCustomer", "/api/Customer/token/*").hasRole("CUSTOMER")
                //EMPLOYEE ONLY
                .antMatchers("/api/login/isEmployee", "/api/Employee/token/*").hasRole("EMPLOYEE")
                //ADMIN ONLY
                .antMatchers("/api/bookings/all", "/api/services/delete/*/*", "/api/services/delete",
                        "api/Employee", "api/register/findEmployeeByUsername/*/*/*/*/*", "h2-console/**", "/api/login/isAdmin",
                        "/api/Admin/token/*")
                .hasRole("ADMIN")
                //ADMIN AND EMPLOYEE
                .antMatchers("/api/bookings/*")
                .hasAnyRole("ADMIN","EMPLOYEE")
                //ANY LOGGED IN USER
                .antMatchers("/api/bookings","/api/bookings/available/*", "/api/bookings/available/time/*/*/*","/api/bookings/all",
                        "/api/services/all", "/api/services/*", "/api/services/employee/*", "/api/services/name/*", "/api/services/fetch/**", "/api/services",
                        "api/Employee/*", "api/Employee/AllEmployees","api/Customer/*", "api/Customer/AllCustomers")
                .hasAnyRole("ADMIN", "EMPLOYEE", "CUSTOMER")
                //ANY USER
                .antMatchers("api/register/findUserByName/*/*/*/*/*", "/api/login/authenticate").permitAll()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.userDetailsService(accountDetailsService);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder()
    {
        //Returns Password encoder being Used NOTE NoOpPasswordEncoder to not be used for final release as it is work around for using plane text
        //TODO Change password encoder to anything but NoOpPasswordEncoder
        return NoOpPasswordEncoder.getInstance();
    }


}
