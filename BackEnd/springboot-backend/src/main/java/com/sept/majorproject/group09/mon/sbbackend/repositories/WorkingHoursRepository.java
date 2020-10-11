package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkingHoursRepository extends CrudRepository<WorkingHours, Long> {

    @Query(value = "SELECT * FROM Working_Hours WHERE employee_id = :employeeId ORDER BY date ASC", nativeQuery = true)
    List<WorkingHours> findAllByEmployee(@Param("employeeId") String employeeId);

    @Query(value = "SELECT * FROM Working_Hours WHERE employee_id = :employeeId AND date > :date AND date < :nextDate ORDER BY date ASC", nativeQuery = true)
    List<WorkingHours> findAllByEmployeeAndDate(@Param("employeeId") String employeeId, @Param("date") String date, @Param("nextDate") String nextDate);

}
