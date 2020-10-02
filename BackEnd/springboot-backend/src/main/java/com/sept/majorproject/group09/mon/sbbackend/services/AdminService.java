package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Admin;
import com.sept.majorproject.group09.mon.sbbackend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AdminService
{
    @Autowired
    AdminRepository adminRepository;

    public Admin getAdminByUsername(String username)
    {
        try
        {
            return adminRepository.adminByUsername(username).get(0);
        }
        catch(IndexOutOfBoundsException e)
        {
            return null;
        }

    }

    public List<Admin> getAllAdmins()
    {
        return adminRepository.allAdmin();
    }


}
