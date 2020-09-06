package com.sept.majorproject.group09.mon.sbbackend.repositories;


import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends AccountRepository
{

    /*
        *  CAREFUL - this should be Iterable<Customer> instead. Please logic check if this is 'fine' by finding by <Account> instead
        * - Might need to double check existence of AccountRepository
     */
    @Override
    Iterable<Account> findAllById(Iterable<String> iterable);

    @Query( value = "SELECT * FROM CUSTOMER WHERE USER_NAME= :userName", nativeQuery = true)
    //@Query(value =  "SELECT u FROM CUSTOMER u WHERE u.userName = ?1", nativeQuery = true)
    List<Customer> customerUsername(@Param("userName") String userName);





}
