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
        Calendar date = Calendar.getInstance();

        this.repository.save(new WorkingHours("Jim_User", 8.3, 10.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Jim_User", 12.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Frank_User", 8.3, 12.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Frank_User", 13.3, 18.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Bill_User", 8.3, 10.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Bill_User", 12.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        date.add(Calendar.DATE, 1);
        this.repository.save(new WorkingHours("Jim_User", 4.0, 18.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Bill_User", 10.3, 12.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Bill_User", 13.0, 17.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        date.add(Calendar.DATE, 1);
        this.repository.save(new WorkingHours("Jim_User", 6.3, 10.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Jim_User", 10.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Frank_User", 9.0, 13.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Bill_User", 9.0, 13.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Bill_User", 13.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        date.add(Calendar.DATE, 3);
        this.repository.save(new WorkingHours("Jim_User", 6.3, 10.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Jim_User", 15.0, 21.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Frank_User", 21.0, 23.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Frank_User", 15.0, 20.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Bill_User", 9.0, 13.0, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Bill_User", 13.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        date.add(Calendar.DATE, 1);
        this.repository.save(new WorkingHours("Jim_User", 8.3, 10.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Jim_User", 12.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Frank_User", 8.3, 12.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Frank_User", 13.3, 18.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));

        this.repository.save(new WorkingHours("Bill_User", 8.3, 10.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
        this.repository.save(new WorkingHours("Bill_User", 12.3, 16.3, date.getTime(), WorkingHours.DayOfWeek.MONDAY));
    }
}