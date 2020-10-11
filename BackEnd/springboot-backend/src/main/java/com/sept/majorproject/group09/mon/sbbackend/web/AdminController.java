package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Admin;
import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.services.AdminService;
import com.sept.majorproject.group09.mon.sbbackend.tokenization.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping(
        value = "/api/Admin"
)
public class AdminController
{


    @Autowired
    AdminService adminService;

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/token/{jwt}")
    public ResponseEntity<?> getAdminFromToken(@PathVariable("jwt") String jwtToken)
    {
        String username = jwtUtil.extractUsername(jwtToken);

        Admin admin  =  adminService.getAdminByUsername(username);

        return ResponseEntity.ok(admin);
    }
}
