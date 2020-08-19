package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {

    @Query(value = "SELECT * FROM Booking WHERE employee_id = :employeeId", nativeQuery = true)
    List<Booking> findAllByEmployee(@Param("employeeId") long employeeId);

    @Query(value = "SELECT * FROM Booking WHERE service_id = :serviceId", nativeQuery = true)
    List<Booking> findAllByService(@Param("serviceId") long serviceId);
}
