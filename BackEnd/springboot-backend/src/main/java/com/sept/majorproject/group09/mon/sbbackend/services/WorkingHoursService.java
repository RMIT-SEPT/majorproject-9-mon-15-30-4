package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.repositories.WorkingHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        workingHoursRepository.save(workingHours);
    }
}
