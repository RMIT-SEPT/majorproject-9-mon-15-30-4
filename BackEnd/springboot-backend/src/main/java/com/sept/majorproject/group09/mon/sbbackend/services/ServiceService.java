package com.sept.majorproject.group09.mon.sbbackend.services;
import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import com.sept.majorproject.group09.mon.sbbackend.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        List<Service> services = new ArrayList<Service>();
        serviceRepository.findAll().forEach(service -> services.add(service));
        return services;
    }

    public Service getServiceById(long id) {
        return serviceRepository.findById(id).get();
    }

    public List<Service> getServicesByEmployee(String employeeId) {
        List<Service> services = new ArrayList<>();
        serviceRepository.findAllByEmployee(employeeId).forEach(service -> services.add(service));
        return services;
    }

    public List<Service> getServicesByName(String name) {
        List<Service> services = new ArrayList<>();
        serviceRepository.findAllByName(name).forEach(service -> services.add(service));
        return services;
    }

    public Service getServicesByEmployeeAndName(String id, String name) {
        return serviceRepository.findAllByEmployeeAndName(id, name);
    }

    public void saveOrUpdate(Service service) {
        serviceRepository.save(service);
    }

    public void delete(Service service) {
        serviceRepository.delete(service);
    }
}

