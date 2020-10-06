package com.sept.majorproject.group09.mon.sbbackend.web;


import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.services.WorkingHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@CrossOrigin
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

    @PutMapping("")
    public void updateTimeFrame(@RequestBody WorkingHours newHours) {
        workingHoursService.findById(newHours.getId())
                .map(hours -> {
                    hours.setDate(newHours.getDate());
                    hours.setStartTime(newHours.getStartTime());
                    hours.setEndTime(newHours.getEndTime());
                    workingHoursService.saveOrUpdate(hours);
                    return null;
                }).orElseGet(() -> {
                    workingHoursService.saveOrUpdate(newHours);
                    return null;
                });
    }

    @DeleteMapping("/{id}")
    public void deleteHours(@PathVariable("id") long id) {
        workingHoursService.deleteHours(id);
    }
}
