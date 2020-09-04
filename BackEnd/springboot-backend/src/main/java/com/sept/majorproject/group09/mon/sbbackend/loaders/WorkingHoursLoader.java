package com.sept.majorproject.group09.mon.sbbackend.loaders;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.repositories.BookingRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.WorkingHoursRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;


@Component
public class WorkingHoursLoader implements CommandLineRunner {

    private final WorkingHoursRepository repository;

    @Autowired
    public WorkingHoursLoader(WorkingHoursRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
//        String employeeId, double startTime, double endTime, Date date, DayOfWeek day
        Calendar date = Calendar.getInstance();

        date.set(2020, Calendar.AUGUST, 17);
        this.repository.save(new WorkingHours("1", 8.3, 10.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("1", 12.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        date.set(2020, Calendar.AUGUST, 19);
        this.repository.save(new WorkingHours("1", 8., 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
    }
}