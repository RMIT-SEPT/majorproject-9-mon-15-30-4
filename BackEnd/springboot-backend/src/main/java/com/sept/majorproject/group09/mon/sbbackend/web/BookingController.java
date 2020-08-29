package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @GetMapping("/all")
    private List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    private List<Booking> getBookingsByEmployee(@PathVariable("id") String id) {
        return bookingService.getBookingsByEmployee(id);
    }

    @GetMapping("/available/{employeeId}")
    private List<int[]> getAvailableTimes(@PathVariable("employeeId") String employeeId) {
        return bookingService.getAvailableTimesByEmployee(employeeId);
    }

    @PostMapping("")
    private long saveBooking(@RequestBody Booking booking) {
        bookingService.saveOrUpdate(booking);
        return booking.getId();
    }
}
