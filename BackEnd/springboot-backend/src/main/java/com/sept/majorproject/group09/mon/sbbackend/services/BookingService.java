package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAll().forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByEmployee(long employeeId) {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAllByEmployee(employeeId).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByService(long serviceId) {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAllByService(serviceId).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Date[]> getAvailableTimesByServiceAndEmployee(long serviceId, long employeeId){
        List<Date[]> timeslots = new ArrayList<Date[]>();

        // Get Employee's working hours
        // Deduct already schedule bookings from working hour.

        return timeslots;
    }

    public void saveOrUpdate(Booking booking) {
        bookingRepository.save(booking);
    }
}
