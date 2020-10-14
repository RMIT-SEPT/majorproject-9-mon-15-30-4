package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.repositories.WorkingHoursRepository;

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
        Calendar shiftDate = Calendar.getInstance();
        String dateString[] = new String[0];
        String day = null;
        if(workingHours[0].getStartTime() == workingHours[0].getEndTime()) {
            dateString = workingHours[0].getEmployeeId().split("-");
            shiftDate.set(Integer.parseInt(dateString[0]), Integer.parseInt(dateString[1]) - 1, Integer.parseInt(dateString[2]));
            workingHours[0].setDate(shiftDate.getTime());
            day = (shiftDate.get(Calendar.YEAR) + "-"
                    + (Integer.toString(shiftDate.get(Calendar.MONTH) + 1).length() == 1
                    ? "0" + shiftDate.get(Calendar.MONTH) + 1 : shiftDate.get(Calendar.MONTH) + 1)
                    + "-" + shiftDate.get(Calendar.DATE));
            shiftDate.add(Calendar.DAY_OF_MONTH, 1);
        }

        String dayAfter = (shiftDate.get(Calendar.YEAR) + "-"
                + (Integer.toString(shiftDate.get(Calendar.MONTH) + 1).length() == 1
                ? "0" + shiftDate.get(Calendar.MONTH) + 1 : shiftDate.get(Calendar.MONTH) + 1)
                + "-" + shiftDate.get(Calendar.DATE));

        List<WorkingHours> workingHoursList = workingHoursRepository.findAllByEmployeeAndDate(dateString[3],
                day, dayAfter);
        Calendar newHours = Calendar.getInstance();

        newHours.setTime(workingHours[0].getDate());
        for (WorkingHours hours : workingHoursList)
                workingHoursRepository.deleteById(hours.getId());

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
