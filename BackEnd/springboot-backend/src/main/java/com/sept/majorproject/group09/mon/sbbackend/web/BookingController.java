package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    BookingService bookingService;

    //GET ALL BOOKINGS
    @GetMapping("/all")
    private List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    //GET BOOKING BY EMPLOYEE ID
    @GetMapping("/{id}")
    private List<Booking> getBookingsByEmployee(@PathVariable("id") String id) {
        return bookingService.getBookingsByEmployee(id);
    }

    //GET ALL AVAILABLE TIMES
    @GetMapping("/available/{employeeId}")
    private List<int[]> getAvailableTimes(@PathVariable("employeeId") String employeeId) {
        return bookingService.getAvailableTimesByEmployee(employeeId);
    }

    //GET THE AVAILABLE TIME given DATE, the TYPE of service (ID), and EMPLOYEE
    @GetMapping("/available/time/{date}/{serviceId}/{employeeId}")
    private boolean getAvailableTimes(@PathVariable("date") String date,
                                      @PathVariable("serviceId") long serviceId,
                                      @PathVariable("employeeId") String employeeId) {
        return bookingService.slotAvailable(date, serviceId, employeeId);
    }

    @GetMapping("/unconfirmed")
    private List<Booking> getUnconfirmedBookings(){return bookingService.getUnconfirmedBookings();}

    //IF CALLED, SAVE BOOKING BASED ON FRONT-END SUBMISSION
    @PostMapping("")
    private long saveBooking(@RequestBody Booking booking) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(booking.getDate());
        cal.add(Calendar.HOUR, -1);
        booking.setDate(cal.getTime());
        bookingService.saveOrUpdate(booking);
        return booking.getId();
    }
}
