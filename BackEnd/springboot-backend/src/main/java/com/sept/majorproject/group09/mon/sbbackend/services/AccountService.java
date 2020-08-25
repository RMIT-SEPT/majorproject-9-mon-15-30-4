package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountService
{
    @Autowired
    AccountRepository accountRepository;


    public String getPasswordByUserName(String userName)
    {
        return accountRepository.passwordByUserName(userName).get(0);
    }

}
