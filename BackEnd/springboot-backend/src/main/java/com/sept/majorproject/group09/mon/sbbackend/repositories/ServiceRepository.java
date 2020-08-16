package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Service, Long> {

}
