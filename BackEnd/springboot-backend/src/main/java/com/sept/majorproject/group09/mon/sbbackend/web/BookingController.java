package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {
    @Autowired
    BookingService bookingService;

    @GetMapping("/bookings")
    private List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings/{id}")
    private List<Booking> getBookingsByEmployee(@PathVariable("id") String id) {
        return bookingService.getBookingsByEmployee(id);
    }

    @GetMapping("/bookings/available/{employeeId}")
    private List<int[]> getAvailableTimes(@PathVariable("employeeId") String employeeId) {
        return bookingService.getAvailableTimesByEmployee(employeeId);
    }

    @PostMapping("/bookings")
    private long saveBooking(@RequestBody Booking booking) {
        bookingService.saveOrUpdate(booking);
        return booking.getId();
    }
}
