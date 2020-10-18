package com.sept.majorproject.group09.mon.sbbackend.tokenization;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil
{
    private String SECRET_KEY = "nottelling";

    public String extractUsername(String token)
    {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token)
    {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
    {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token)
    {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    //CHECK IF TOKEN IS EXPIRED
    private boolean isTokenExpired(String token)
    {
        return extractExpiration(token).before(new Date());
    }

        //CREATE TOKEN BASED ON HASHMAP
    public String generateToken(UserDetails userDetails)
    {

        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());


    }


    //CREATE TOKEN, FOR A SET AMOUNT OF TIME (in miliseconds)
    private String createToken(Map<String, Object> claims, String subject)
    {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000 * 4))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();


    }

    //VALIDATE TOKEN to ENSURE INTEGRITY
    public boolean validateToken(String token, UserDetails userDetails)
    {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && isTokenExpired(token));
    }



}
