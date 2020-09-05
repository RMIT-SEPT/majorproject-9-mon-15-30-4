package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
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

    @GetMapping("/available/time/{date}/{serviceId}/{employeeId}")
    private boolean getAvailableTimes(@PathVariable("date") String date,
                                      @PathVariable("serviceId") long serviceId,
                                      @PathVariable("employeeId") String employeeId) {
        return bookingService.slotAvailable(date, serviceId, employeeId);
    }

    @PostMapping("")
    private long saveBooking(@RequestBody Booking booking) {
        bookingService.saveOrUpdate(booking);
        return booking.getId();
    }
}
