package all.controller;
import all.controller.configSecurity.JwtTokenUtil;
import all.model.JwtRequest;
import all.model.JwtResponse;
import all.model.MessageResponse;
import all.service.IUserService;
import all.service.impl.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/public")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private IUserService userService;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest,
//                                                       HttpServletResponse response) throws Exception {
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(authenticationRequest.getUsername());
//
//        // Authentication
//        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
//
//        // Get roles list
//        List<String> grantList = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.toList());
//
//        // Create token
//        final String token = jwtTokenUtil.generateToken(userDetails);
//
//        createAuthorizationCookie(response, token);
//        return ResponseEntity.ok(new JwtResponse(grantList, userDetails.getUsername()));
//    }

//    private void createAuthorizationCookie(HttpServletResponse response, String token) {
//        Cookie refreshTokenCookie = new Cookie("Authorization", token);
//        System.out.println(refreshTokenCookie.getValue());
//        refreshTokenCookie.setHttpOnly(true);
//        refreshTokenCookie.setSecure(false); //only allows HTTPS
//        refreshTokenCookie.setPath("/");
//        refreshTokenCookie.setMaxAge(3600);
////        refreshTokenCookie.setDomain("google.com"); //restrict domain
//        response.addCookie(refreshTokenCookie);
//    }


    /**
     * Created by: SangNH
     * Date created: 08/09/2022
     * Function: Expose a POST API /authenticate
     * @param  authenticationRequest
     * @return HTTP status code 401 (UNAUTHORIZED)
     * HTTP status code 200 (OK): return JwtResponse
     */
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        if (authenticationRequest.getUsername() == null || authenticationRequest.getPassword() == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        if (userDetails == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token, roles, userDetails.getUsername()));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> reset(@RequestBody JwtRequest authenticationRequest) throws MessagingException, UnsupportedEncodingException, MessagingException {
        if (userService.existsByUserName(authenticationRequest.getUsername()) != null) {
            return ResponseEntity.ok(new MessageResponse("Sent email "));
        }
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Tài khoản không đúng"));
    }

    @PostMapping("/do-reset-password/{name}")
    public ResponseEntity<?> doResetPassword(@RequestBody JwtRequest authenticationRequest,
                                             @PathVariable String name) {
        if (!Objects.equals(authenticationRequest.getPassword(), "")) {
            userService.saveNewPassword(passwordEncoder().encode(authenticationRequest.getPassword()), name);
            return ResponseEntity.ok(new MessageResponse("success"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Mật khẩu mới không được để trống!"));
    }
}
