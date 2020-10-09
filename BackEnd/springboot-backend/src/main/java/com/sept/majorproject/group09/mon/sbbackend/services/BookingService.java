package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.repositories.BookingRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.ServiceRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.WorkingHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.*;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<>();
        bookingRepository.findAll().forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByEmployee(String employeeId) {
        List<Booking> bookings = new ArrayList<>();
        bookingRepository.findAllByEmployee(employeeId).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public  List<Booking> getUnconfirmedBookings(){
        List<Booking> bookings = new ArrayList<>();
        for (Booking b: bookingRepository.findAll()) {
            if(!b.getConfirmed()){
                bookings.add(b);
            }
        }
        return bookings;
    }

    public List<Booking> getBookingsByService(long serviceId) {
        List<Booking> bookings = new ArrayList<>();
        bookingRepository.findAllByService(serviceId).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByDateAndEmployee(String employeeId, int day, int month, int year) {
        List<Booking> bookings = new ArrayList<>();
        String date = String.format("%d-%02d-%02d", year, month, day);
        bookingRepository.findAllByDateAndEmployee(employeeId, date).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    static final int DAY = 0, YEAR = 1, MONTH = 2,  DAY_OF_MONTH = 3, START_HOUR = 4, START_MINUTE = 5,
            END_HOUR = 6, END_MINUTE = 7;
    @Autowired
    WorkingHoursRepository workingHoursRepository;
    @Autowired
    ServiceRepository serviceRepository;
    public List<int[]> getAvailableTimesByEmployee(String employeeId){
        List<int[]> timeslots = new ArrayList<>();
        List<WorkingHours> workingHours = workingHoursRepository.findAllByEmployee(employeeId);
        Calendar timeFrame = Calendar.getInstance();

        for (WorkingHours hours : workingHours) { // Populate timeslots with employee work hours
            int startTimeHour = (int)hours.getStartTime(), endTimeHour = (int)hours.getEndTime(),
                    startTimeMinutes = Integer.parseInt(String.valueOf(hours.getStartTime()).split("\\.")[1]),
                    endTimeMinutes = Integer.parseInt(String.valueOf(hours.getEndTime()).split("\\.")[1]);
            //Convert decimal representation to minutes e.g. .3 = 30 minutes
            if(startTimeMinutes < 10)
                startTimeMinutes *= 10;
            if(endTimeMinutes < 10)
                endTimeMinutes *= 10;

            timeFrame.setTime(hours.getDate());

            timeslots.add(new int[]{hours.getDay().ordinal(), timeFrame.get(Calendar.YEAR),
                    timeFrame.get(Calendar.MONTH) + 1, timeFrame.get(Calendar.DAY_OF_MONTH), startTimeHour,
                    startTimeMinutes, endTimeHour, endTimeMinutes});
        }

        List<Booking> bookings = getBookingsByEmployee(employeeId);
        for (Booking booking: bookings) { // Update timeslots to reflect taken booking timeframes
            int duration;
            if(serviceRepository.findById(booking.getServiceId()).equals(Optional.empty()))
                continue;
            else
                duration = serviceRepository.findById(booking.getServiceId()).get().getDuration();

            for (int timeslot = 0; timeslot < timeslots.size(); timeslot++) {
                timeFrame.setTime(booking.getDate());
                int[] currentTimeslot = timeslots.get(timeslot);

                // If booking starts on or after timeslot start.
                if(timeFrame.get(Calendar.YEAR) == timeslots.get(timeslot)[YEAR]
                        && (timeFrame.get(Calendar.MONTH) + 1) == timeslots.get(timeslot)[MONTH]
                        && timeFrame.get(Calendar.DAY_OF_MONTH) == timeslots.get(timeslot)[DAY_OF_MONTH]
                        && (timeFrame.get(Calendar.HOUR_OF_DAY) > timeslots.get(timeslot)[START_HOUR]
                        || (timeFrame.get(Calendar.HOUR_OF_DAY) == timeslots.get(timeslot)[START_HOUR]
                                && timeFrame.get(Calendar.MINUTE) >= timeslots.get(timeslot)[START_MINUTE]))){
                        timeFrame.add(Calendar.MINUTE, duration);

                        // If booking ends on or before timeslot end.
                        if(timeFrame.get(Calendar.HOUR_OF_DAY) < timeslots.get(timeslot)[END_HOUR]
                                || (timeFrame.get(Calendar.HOUR_OF_DAY) == timeslots.get(timeslot)[END_HOUR]
                                && timeFrame.get(Calendar.MINUTE) <= timeslots.get(timeslot)[END_MINUTE])){
                            // Remaining availability either side of booking
                            int afterHours = timeslots.get(timeslot)[END_HOUR] - timeFrame.get(Calendar.HOUR_OF_DAY),
                                    afterMinutes = timeslots.get(timeslot)[END_MINUTE] - timeFrame.get(Calendar.MINUTE);
                            timeFrame.add(Calendar.MINUTE, -duration);
                            int beforeHours = timeFrame.get(Calendar.HOUR_OF_DAY) - timeslots.get(timeslot)[START_HOUR],
                                    beforeMinutes = timeFrame.get(Calendar.MINUTE) - timeslots.get(timeslot)[START_MINUTE];

                            int inserts = 0;
                            if(beforeHours != 0 || beforeMinutes != 0){ // Insert timeframe for before booking
                                timeFrame.set(Calendar.HOUR_OF_DAY, currentTimeslot[START_HOUR]);
                                timeFrame.set(Calendar.MINUTE, currentTimeslot[START_MINUTE]);
                                timeFrame.add(Calendar.HOUR_OF_DAY, beforeHours);
                                timeFrame.add(Calendar.MINUTE, beforeMinutes);

                                timeslots.add(timeslot, new int[]{currentTimeslot[DAY], currentTimeslot[YEAR],
                                        currentTimeslot[MONTH], currentTimeslot[DAY_OF_MONTH],
                                        currentTimeslot[START_HOUR], currentTimeslot[START_MINUTE],
                                        timeFrame.get(Calendar.HOUR_OF_DAY), timeFrame.get(Calendar.MINUTE)});
                                inserts++;
                            }

                            if(afterHours != 0 || afterMinutes != 0){ // Insert timeframe for after booking
                                timeFrame.set(Calendar.HOUR_OF_DAY, currentTimeslot[END_HOUR]);
                                timeFrame.set(Calendar.MINUTE, currentTimeslot[END_MINUTE]);
                                timeFrame.add(Calendar.HOUR_OF_DAY, -afterHours);
                                timeFrame.add(Calendar.MINUTE, -afterMinutes);

                                timeslots.add(timeslot + inserts, new int[]{currentTimeslot[DAY],
                                        currentTimeslot[YEAR], currentTimeslot[MONTH], currentTimeslot[DAY_OF_MONTH],
                                        timeFrame.get(Calendar.HOUR_OF_DAY), timeFrame.get(Calendar.MINUTE),
                                        currentTimeslot[END_HOUR], currentTimeslot[END_MINUTE]});
                                inserts++;
                            }

                            // Remove original timeframe of booking clash
                            timeslots.remove(timeslot + inserts);
                            // Stop looking for potential timeframe clashes
                            break;
                        }
                }
            }
        }
        return timeslots; // [DAY, YEAR, MONTH, DAY_OF_MONTH, START_HOUR, START_MINUTE, END_HOUR, END_MINUTE]
    }

    public boolean slotAvailable(String dateString, long serviceId, String employeeId) {
        Calendar check = Calendar.getInstance();
        String tokens[] = dateString.split("-|@|:");

        check.set(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1]) - 1,
                Integer.parseInt(tokens[2]), Integer.parseInt(tokens[3]),
                Integer.parseInt(tokens[4]));
        Booking checkBooking = new Booking(check.getTime(), serviceId);
        List<int[]> timeslots = getAvailableTimesByEmployee(employeeId);
        Calendar timeFrame = Calendar.getInstance();

        int duration = serviceRepository.findById(checkBooking.getServiceId()).get().getDuration();

        for (int timeslot = 0; timeslot < timeslots.size(); timeslot++) {
            timeFrame.setTime(checkBooking.getDate());

            // If booking starts on or after timeslot start.
            if (timeFrame.get(Calendar.YEAR) == timeslots.get(timeslot)[YEAR]
                    && (timeFrame.get(Calendar.MONTH) + 1) == timeslots.get(timeslot)[MONTH]
                    && timeFrame.get(Calendar.DAY_OF_MONTH) == timeslots.get(timeslot)[DAY_OF_MONTH]
                    && (timeFrame.get(Calendar.HOUR_OF_DAY) > timeslots.get(timeslot)[START_HOUR]
                    || (timeFrame.get(Calendar.HOUR_OF_DAY) == timeslots.get(timeslot)[START_HOUR]
                    && timeFrame.get(Calendar.MINUTE) >= timeslots.get(timeslot)[START_MINUTE]))) {
                timeFrame.add(Calendar.MINUTE, duration);

                // If booking ends on or before timeslot end.
                if (timeFrame.get(Calendar.HOUR_OF_DAY) < timeslots.get(timeslot)[END_HOUR]
                        || (timeFrame.get(Calendar.HOUR_OF_DAY) == timeslots.get(timeslot)[END_HOUR]
                        && timeFrame.get(Calendar.MINUTE) <= timeslots.get(timeslot)[END_MINUTE])) {
                    return true;
                }
            }
        }

        return false;
    }

    public void saveOrUpdate(Booking booking) {
        System.out.println(booking.getDate());
        bookingRepository.save(booking);
    }
}
