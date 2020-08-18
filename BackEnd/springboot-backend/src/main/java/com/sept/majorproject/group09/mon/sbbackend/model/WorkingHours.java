import java.util.Date;

public class WorkingHours {
    enum DayOfWeek{
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    private double startTime, endTime;
    private Date date;
    private DayOfWeek day;

    public double getStartTime() {
        return startTime;
    }

    public double getEndTime() {
        return endTime;
    }

    public DayOfWeek getDay() {
        return day;
    }

    public Date getDate() {
        return date;
    }
}
