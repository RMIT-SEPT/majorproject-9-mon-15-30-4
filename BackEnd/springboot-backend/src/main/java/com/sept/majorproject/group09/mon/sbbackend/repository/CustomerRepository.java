package com.sept.majorproject.group09.mon.sbbackend.repository;


import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends AccountRepository
{

    /*
        *  CAREFUL - this should be Iterable<Customer> instead. Please logic check if this is 'fine' by finding by <Account> instead
        * - Might need to double check existence of AccountRepository
     */
    @Override
    Iterable<Account> findAllById(Iterable<String> iterable);
}
