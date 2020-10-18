package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends CrudRepository<Service, Long> {

    @Query(value = "SELECT * FROM Service WHERE employee_id = :employeeId", nativeQuery = true)
    List<Service> findAllByEmployee(@Param("employeeId") String employeeId);

    @Query(value = "SELECT * FROM Service WHERE name = :name", nativeQuery = true)
    List<Service> findAllByName(@Param("name") String name);

    @Query(value = "SELECT * FROM Service WHERE employee_id = :employeeId AND name = :name", nativeQuery = true)
    Service findAllByEmployeeAndName(@Param("employeeId") String employeeId,
                                           @Param("name") String name);

}
