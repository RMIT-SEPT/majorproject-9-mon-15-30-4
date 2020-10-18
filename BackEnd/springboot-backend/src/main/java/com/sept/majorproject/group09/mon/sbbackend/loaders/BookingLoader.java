package com.sept.majorproject.group09.mon.sbbackend.loaders;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.TimeZone;


@Component
public class BookingLoader implements CommandLineRunner {

    private final BookingRepository repository;

    @Autowired
    public BookingLoader(BookingRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Calendar date = Calendar.getInstance();
        date.setTimeZone(TimeZone.getTimeZone("GMT+0"));

        date.set(2020, Calendar.AUGUST, 17, 8, 30);
        this.repository.save(new Booking(date.getTime(), 1, "John_Customer", "Jim_User"));

        date.set(2020, Calendar.AUGUST, 17, 8, 30);
        this.repository.save(new Booking(date.getTime(), 1, "Fred_Customer", "Frank_User"));

        date.set(2020, Calendar.AUGUST, 17, 14, 0);
        this.repository.save(new Booking(date.getTime(), 2, "George_Customer", "Jim_User"));

        date.set(2020, Calendar.AUGUST, 19, 8, 30);
        this.repository.save(new Booking(date.getTime(), 2, "Harry_Customer", "Jim_User"));

        date.set(2020, Calendar.AUGUST, 19, 18, 0);
        this.repository.save(new Booking(date.getTime(), 2, "John_Customer", "Frank_User"));
    }
}