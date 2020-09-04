package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.services.WorkingHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class WorkingHoursController {
    @Autowired
    WorkingHoursService workingHoursService;

    @GetMapping("/working_hours")
    private List<WorkingHours> getAllWorkingHours() {
        return workingHoursService.getAllWorkingHours();
    }

    @PostMapping("/working_hours")
    private long saveWorkingHours(@RequestBody WorkingHours workingHours) {
        workingHoursService.saveOrUpdate(workingHours);
        return workingHours.getId();
    }
}
