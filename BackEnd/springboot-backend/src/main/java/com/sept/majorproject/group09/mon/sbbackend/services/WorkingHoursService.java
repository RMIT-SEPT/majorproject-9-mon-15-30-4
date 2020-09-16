package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.repositories.WorkingHoursRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
public class WorkingHoursService {
    @Autowired
    WorkingHoursRepository workingHoursRepository;

    public List<WorkingHours> getAllWorkingHours() {
        List<WorkingHours> workingHours = new ArrayList<WorkingHours>();
        workingHoursRepository.findAll().forEach(hours -> workingHours.add(hours));
        return workingHours;
    }

    public List<WorkingHours> getWorkingHoursByEmployee(String employeeId) {
        List<WorkingHours> hours = new ArrayList<WorkingHours>();
        workingHoursRepository.findAllByEmployee(employeeId).forEach(workingHours -> hours.add(workingHours));
        return hours;
    }

    public void saveOrUpdate(WorkingHours workingHours) {
        List<WorkingHours> workingHoursList = workingHoursRepository.findAllByEmployee(workingHours.getEmployeeId()),
                overlap = new ArrayList<>();
        Calendar existing = Calendar.getInstance(), newHours = Calendar.getInstance();
        newHours.setTime(workingHours.getDate());

        for (WorkingHours hours : workingHoursList) {
            System.out.println("E: " + hours.getId());
            existing.setTime(hours.getDate());

            if (newHours.get(Calendar.YEAR) == existing.get(Calendar.YEAR)
                    && newHours.get(Calendar.MONTH) == existing.get(Calendar.MONTH)
                    && newHours.get(Calendar.DAY_OF_MONTH) == existing.get(Calendar.DAY_OF_MONTH)) {

                if (workingHours.getStartTime() >= hours.getStartTime()
                        && workingHours.getStartTime() <= hours.getEndTime()) // Starts overlap
                    overlap.add(hours);
                else if (workingHours.getEndTime() >= hours.getStartTime()
                        && workingHours.getEndTime() <= hours.getEndTime()) // Ends overlap
                    overlap.add(hours);
                else if(workingHours.getStartTime() <= hours.getStartTime()
                        && workingHours.getEndTime() >= hours.getEndTime()) // Inclusive overlap
                    overlap.add(hours);

            }
        }

        Calendar earliestDate = Calendar.getInstance(), latestDate = Calendar.getInstance();
        earliestDate.setTime(workingHours.getDate());
        latestDate.setTime(workingHours.getDate());
        double earliestTime = workingHours.getStartTime(), latestTime = workingHours.getEndTime();

        for (WorkingHours hours : overlap) {
            System.out.println(hours.getId());
           if (hours.getStartTime() < earliestTime) {
                earliestDate.setTime(hours.getDate());
                earliestTime = hours.getStartTime();
            }
            if (hours.getEndTime() > latestTime) {
                latestDate.setTime(hours.getDate());
                latestTime = hours.getEndTime();
            }
        }

        for (WorkingHours hours : overlap) {
            System.out.println(hours.getId());
            workingHoursRepository.deleteById(hours.getId());
        }

        WorkingHours insertHours;
        newHours.setTime(earliestDate.getTime());
        insertHours = new WorkingHours(workingHours.getEmployeeId(), earliestTime, latestTime, newHours.getTime(),
                workingHours.getDay());
        workingHoursRepository.save(insertHours);
    }


    public Optional<WorkingHours> findById(long id){
        return workingHoursRepository.findById(id);
    }

    public void deleteHours(long id) {
        workingHoursRepository.deleteById(id);
    }
}
