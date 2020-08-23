package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import com.sept.majorproject.group09.mon.sbbackend.repositories.BookingRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.ServiceRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.WorkingHoursRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.MappedSuperclass;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAll().forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByEmployee(String employeeId) {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAllByEmployee(employeeId).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByService(String serviceId) {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAllByService(serviceId).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    public List<Booking> getBookingsByDateAndEmployee(String employeeId, int day, int month, int year) {
        List<Booking> bookings = new ArrayList<Booking>();
        String date = String.format("%d-02d-02d", year, month, day);
        bookingRepository.findAllByDateAndEmployee(employeeId, date).forEach(booking -> bookings.add(booking));
        return bookings;
    }

    static final int DAY = 0, YEAR = 1, MONTH = 2,  DAY_OF_MONTH = 3, START_HOUR = 4, START_MINUTE = 5,
            END_HOUR = 6, END_MINUTE = 7;

    @Autowired
    WorkingHoursRepository workingHoursRepository;
    @Autowired
    ServiceRepository serviceRepository;
    public List<int[]> getAvailableTimesByServiceAndEmployee(long serviceId, String employeeId){
        List<int[]> timeslots = new ArrayList<int[]>();
        List<WorkingHours> workingHours = workingHoursRepository.findAllByEmployee(employeeId);

        Calendar timeFrame = Calendar.getInstance();
        for (WorkingHours hours : workingHours) {
            int startTimeHour = (int)hours.getStartTime(), endTimeHour = (int)hours.getEndTime();
            int startTimeMinutes = Integer.parseInt(String.valueOf(hours.getStartTime()).split("\\.")[1]);
            int endTimeMinutes = Integer.parseInt(String.valueOf(hours.getEndTime()).split("\\.")[1]);
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
        for (Booking booking: bookings) {
            System.out.println("--------------");
            timeFrame.setTime(booking.getDate());
            int duration;
            if(serviceRepository.findById(booking.getServiceId()).equals(Optional.empty()))
                continue;
            else
                duration = serviceRepository.findById(booking.getServiceId()).get().getDuration();
            for (int timeslot = 0; timeslot < timeslots.size(); timeslot++) {
                int[] currentTimeslot = timeslots.get(timeslot);
                System.out.println("Timeslot:" + timeslots.get(timeslot)[YEAR]
                        + ":" + timeslots.get(timeslot)[MONTH] + ":" + timeslots.get(timeslot)[DAY_OF_MONTH]
                        + ":" + timeslots.get(timeslot)[START_HOUR] + ":" + timeslots.get(timeslot)[START_MINUTE]
                        + ":" + timeslots.get(timeslot)[END_HOUR] + ":" + timeslots.get(timeslot)[END_MINUTE]);
                System.out.println(timeFrame.get(Calendar.YEAR) + ":" + (timeFrame.get(Calendar.MONTH) + 1) + ":"
                        + timeFrame.get(Calendar.DAY_OF_MONTH) + ":" + timeFrame.get(Calendar.HOUR_OF_DAY)
                        + ":" + timeFrame.get(Calendar.MINUTE) + ":" + duration);
                if(timeFrame.get(Calendar.YEAR) == timeslots.get(timeslot)[YEAR]
                        && (timeFrame.get(Calendar.MONTH) + 1) == timeslots.get(timeslot)[MONTH]
                        && timeFrame.get(Calendar.DAY_OF_MONTH) == timeslots.get(timeslot)[DAY_OF_MONTH]
                        && timeFrame.get(Calendar.HOUR_OF_DAY) >= timeslots.get(timeslot)[START_HOUR]
                        && timeFrame.get(Calendar.MINUTE) >= timeslots.get(timeslot)[START_MINUTE]){
                        timeFrame.add(Calendar.MINUTE, duration);
                        if(timeFrame.get(Calendar.HOUR_OF_DAY) <= timeslots.get(timeslot)[END_HOUR]
                                && timeFrame.get(Calendar.MINUTE) <= timeslots.get(timeslot)[END_MINUTE]){
                            System.out.println("Clash");
                            int afterHours = timeslots.get(timeslot)[END_HOUR] - timeFrame.get(Calendar.HOUR_OF_DAY),
                                    afterMinutes = timeslots.get(timeslot)[END_MINUTE] - timeFrame.get(Calendar.MINUTE);
                            timeFrame.add(Calendar.MINUTE, -duration);
                            int beforeHours = timeFrame.get(Calendar.HOUR_OF_DAY) - timeslots.get(timeslot)[START_HOUR],
                                    beforeMinutes = timeFrame.get(Calendar.MINUTE) - timeslots.get(timeslot)[START_MINUTE];
                            System.out.println("AH: " + afterHours + " AM: " + afterMinutes);
                            System.out.println("BH: " + beforeHours + " BM: " + beforeMinutes);

                            int inserts = 0;
                            if(beforeHours != 0 && beforeMinutes != 0){
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

                            if(afterHours != 0 && afterMinutes != 0){
                                timeFrame.set(Calendar.HOUR_OF_DAY, currentTimeslot[END_HOUR]);
                                timeFrame.set(Calendar.MINUTE, currentTimeslot[END_MINUTE]);
                                timeFrame.add(Calendar.HOUR_OF_DAY, -afterHours);
                                timeFrame.add(Calendar.MINUTE, -afterMinutes);

                                timeslots.add(timeslot + inserts, new int[]{currentTimeslot[DAY], currentTimeslot[YEAR],
                                        currentTimeslot[MONTH], currentTimeslot[DAY_OF_MONTH],
                                        timeFrame.get(Calendar.HOUR_OF_DAY), timeFrame.get(Calendar.MINUTE),
                                        currentTimeslot[END_HOUR], currentTimeslot[END_MINUTE]});
                                inserts++;
                            }

                            timeslots.remove(timeslot + inserts);
                            break;
                        }
                }
            }
        }
        System.out.println("FINAL SLOTS");
        for (int[] t: timeslots) {
            System.out.println(t[DAY] + ":" + t[YEAR] + ":" + t[MONTH] + ":" + t[DAY_OF_MONTH] + ":" + t[START_HOUR]
                    + ":" + t[START_MINUTE] + ":" + t[END_HOUR] + ":" + t[END_MINUTE]);
        }
        return timeslots; //[DayOfWeek, Year, Month, DayOfMonth, startHour, startMinutes, endHour, endMinutes]
    }

    public void saveOrUpdate(Booking booking) {
        System.out.println(booking.getDate());
        bookingRepository.save(booking);
    }
}
