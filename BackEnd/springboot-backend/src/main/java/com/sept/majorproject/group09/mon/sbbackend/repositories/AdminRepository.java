package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Admin;
import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends AccountRepository
{
    @Query( value = "SELECT * FROM ADMIN WHERE USER_NAME= :userName", nativeQuery = true)
        //@Query(value =  "SELECT u FROM CUSTOMER u WHERE u.userName = ?1", nativeQuery = true)
    List<Admin> adminByUsername(@Param("userName") String userName);

    @Query( value = "SELECT * FROM ADMIN", nativeQuery = true)
    List<Admin> allAdmin();
}
