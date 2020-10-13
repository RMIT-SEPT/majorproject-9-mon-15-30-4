package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



import java.util.Calendar;
import java.util.Date;
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

    @GetMapping("/unconfirmed")
    private List<Booking> getUnconfirmedBookings(){return bookingService.getUnconfirmedBookings();}

    @PostMapping("")
    private long saveBooking(@RequestBody Booking booking) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(booking.getDate());
        cal.add(Calendar.HOUR, -1);
        booking.setDate(cal.getTime());
        bookingService.saveOrUpdate(booking);
        return booking.getId();
    }

    @DeleteMapping("/delete/{bookingId}")
    public boolean deleteBooking(@PathVariable("bookingId") long bookingId)
    {
        Booking booking =  bookingService.getBookingById(bookingId);
        boolean canDelete = checkIfDelete(booking);
        if(canDelete)
        {
            bookingService.delete(booking);
        }
        return canDelete;
    }

    @GetMapping("/canDelete/{bookingId}")
    public boolean canDeleteBooking(@PathVariable("bookingId") long bookingId)
    {

        return checkIfDelete(bookingService.getBookingById(bookingId));
    }

    private boolean checkIfDelete(Booking booking)
    {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, 2);
        if(booking.getDate().after(cal.getTime()))
        {
            return true;
        }
        return false;
    }

}
