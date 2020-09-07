package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.services.WorkingHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/working_hours")
public class WorkingHoursController {
    @Autowired
    WorkingHoursService workingHoursService;

    @GetMapping("all")
    private List<WorkingHours> getAllWorkingHours() {
        return workingHoursService.getAllWorkingHours();
    }

    @PostMapping("")
    private long saveWorkingHours(@RequestBody WorkingHours workingHours) {
        workingHoursService.saveOrUpdate(workingHours);
        return workingHours.getId();
    }

    @GetMapping("/{id}")
    public List<WorkingHours> getWorkingHoursByEmployee(@PathVariable("id") String id) {
        return workingHoursService.getWorkingHoursByEmployee(id);
    }
}
