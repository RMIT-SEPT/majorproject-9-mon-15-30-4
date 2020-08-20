package com.sept.majorproject.group09.mon.sbbackend.repository;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AccountRepository extends CrudRepository<Account, String> {
}
