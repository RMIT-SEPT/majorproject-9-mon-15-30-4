package com.sept.majorproject.group09.mon.sbbackend.web;


import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import com.sept.majorproject.group09.mon.sbbackend.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
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

    @GetMapping("/employee/{id}")
    private List<Service> getServicesByEmployee(@PathVariable("id") String id) {
        return serviceService.getServicesByEmployee(id);
    }

    @GetMapping("/name/{name}")
    private List<Service> getServicesByName(@PathVariable("name") String name) {
        return serviceService.getServicesByName(name);
    }

    @GetMapping("/fetch/{employeeId}/{name}")
    private Service getServicesByEmployeeAndName(@PathVariable("employeeId") String employeeId,
                                                 @PathVariable("name") String name) {
        return serviceService.getServicesByEmployeeAndName(employeeId, name);
    }

    @PostMapping("")
    private long saveService(@RequestBody Service service) {
        serviceService.saveOrUpdate(service);
        return service.getId();
    }

    @DeleteMapping("/delete/{employeeId}/{name}")
    private boolean deleteServiceEntry(@PathVariable("employeeId") String employeeId, @PathVariable("name") String name)
    {
        serviceService.delete(serviceService.getServicesByEmployeeAndName(employeeId, name));
        return true;
    }

    @DeleteMapping("/delete")
    private void deleteServiceEntry(@RequestBody Service service)
    {
    	serviceService.delete(service);
    }
}
