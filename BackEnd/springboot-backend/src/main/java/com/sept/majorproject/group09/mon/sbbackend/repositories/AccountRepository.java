package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AccountRepository extends CrudRepository<Account, String> {

    abstract Iterable<Account> findAllById(Iterable<String> iterable);

}
