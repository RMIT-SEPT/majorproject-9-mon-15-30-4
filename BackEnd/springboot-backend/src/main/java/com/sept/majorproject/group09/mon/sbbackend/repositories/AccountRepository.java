package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.util.List;

@NoRepositoryBean
public interface AccountRepository extends CrudRepository<Account, String> {

    abstract Iterable<Account> findAllById(Iterable<String> iterable);

    @Query(value = "SELECT * from ACCOUNT WHERE userName = :userName", nativeQuery = true)
    List<Account> accountByUsername(@Param("userName") String userName);

    @Query(value = "SELECT password from ACCOUNT WHERE userName = :userName", nativeQuery = true)
    List<String> passwordByUserName(@Param("userName") String userNAme);
}
