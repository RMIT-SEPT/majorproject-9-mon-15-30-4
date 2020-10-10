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

    public void saveOrUpdate(WorkingHours[] workingHours) {
        if(workingHours[0].getStartTime() >= 24) {
            Calendar shiftDate = Calendar.getInstance();
            shiftDate.setTime(workingHours[0].getDate());
            shiftDate.add(Calendar.DAY_OF_MONTH, 1);
            workingHours[0].setDate(shiftDate.getTime());
        }

        List<WorkingHours> workingHoursList = workingHoursRepository.findAllByEmployee(workingHours[0].getEmployeeId());
        Calendar existing = Calendar.getInstance(), newHours = Calendar.getInstance();

        newHours.setTime(workingHours[0].getDate());
        for (WorkingHours hours : workingHoursList) {
            existing.setTime(hours.getDate());
            if (newHours.get(Calendar.YEAR) == existing.get(Calendar.YEAR)
                    && newHours.get(Calendar.MONTH) == existing.get(Calendar.MONTH)
                    && newHours.get(Calendar.DAY_OF_MONTH) == existing.get(Calendar.DAY_OF_MONTH)) {
                workingHoursRepository.deleteById(hours.getId());
            }
        }

        for (WorkingHours hour : workingHours)
            hour.setDate(workingHours[0].getDate());

        if(workingHours.length > 1)
            for (int i = 1; i < workingHours.length; i++)
                workingHoursRepository.save(workingHours[i]);
    }


    public Optional<WorkingHours> findById(long id){
        return workingHoursRepository.findById(id);
    }

    public void deleteHours(long id) {
        workingHoursRepository.deleteById(id);
    }
}
