import java.lang.reflect.Array;
import java.util.ArrayList;

public class Employee {

    ArrayList<WorkingHours> workingHours = new ArrayList<WorkingHours>();
    ArrayList<Booking> bookings = new ArrayList<Booking>();

    public Employee(){

    }

    //TODO: getAvailability(), what format should return be in?

    ArrayList getWorkingHours() {
        return workingHours;
    }

    ArrayList getBookings() {
        return bookings;
    }

    boolean addBooking(Booking bookingToAdd) {
        return bookings.add(bookingToAdd);
    }


}
