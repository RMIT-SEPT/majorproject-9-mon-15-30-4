package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import com.sept.majorproject.group09.mon.sbbackend.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    @Autowired
    ServiceService serviceService;

    @GetMapping("/all")
    private List<Service> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    private Service getService(@PathVariable("id") long id) {
        return serviceService.getServiceById(id);
    }

    @PostMapping("")
    private long saveService(@RequestBody Service service) {
        serviceService.saveOrUpdate(service);
        return service.getId();
    }
}
