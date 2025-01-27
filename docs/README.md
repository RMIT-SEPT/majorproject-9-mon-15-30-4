# SEPT: Project Documentation
## Contents
* Project Structure
* How To: Registering A Customer Account
* How To: Registering An Employee Account
* How To: Add a service to an employee
* How To: Remove a service from an employee
* How To: Create a Booking
* How To: Edit Employee's Working Hours

## Project Structure


```
Project
+- Backend 
   +-...
    +- sbbackend
        +- loaders
            | +- BookingLoader.java
            | +- EmployeeLoader.java
            | +- ServiceLoader.java
            | +- WorkingHoursLoader.java
        +- model
            | +- Account.java
            | +- Admin.java
            | +- Booking.java
            | +- Customer.java
            | +- Employee.java
            | +- Service.java
            | +- WorkingHours.java
        +-repositories
            | +- AccountRepository.java
            | +- BookingRepository.java
            | +- CustomerRepository.java
            | +- EmployeeRepository.java
            | +- ServiceRepository.java
            | +- WorkingHoursRepository.java
        +-services
            | +- AccountService.java
            | +- BookingService.java
            | +- CustomerService.java
            | +- EmployeeService.java
            | +- ServiceService.java
            | +- WorkingHoursService.java
        +-web
            | +- BookingController.java
            | +- CustomerController.java
            | +- EmployeeController.java
            | +- LoggingInController.java
            | +- RegisterController.java
            | +- ServiceController.java
            | +- WorkingHoursController.java
        +-SbBackendApplication

+- Frontend
    +-react-front-end
        +-src
            +- components
                +- Bookings
		    | +- AddBooking.js
		    | +- BookingsButton.js
		    | +- Booking.css
                +- Customer
		+- Employee
		    | +- hoursButton.js
		    | +- HoursDisplay.js
		    | +- HoursNoEditable.js
		    | +- Hours.css
                +- Layout
                +- Login
                +- Register
		+- Service
            +- services
                +- bookingService.js
                +- employeeService.js
                +- http-common.js
                +- loginService.js
                +- registerService.js
                +- servicesService.js
                +- workingHoursService.js
```

---

## Quick Start Guide
- To quickly start the project, do the following activities:
    - **BUILD**: In IntelliJ, 'Build' SbBackendApplication under root -->Backend --> springboot-backend -->  src --> main --> ... --> SbBackendApplication
    - **RUN BACKEND**: Run SbBackendApplication. This will create an instance of the Back-end servers, running on H2-Embedded Database. 
        - The contents of the backend can be accessed on http:/localhost:8080/h2-console
        - On the website, the specific 'url' should match 'spring.datasource.url' found in  Backend --> springboot-backend
            --> src --> main --> resources --> application.properties.
            
     - **RUN FRONTEND**: Access the Front End folders, and then open the folder, react-front-end.
        - When the user is within react-front-end, open the terminal and type 'npm start'
        - This command will begin an instance of the front-end.

---
### How To: Registering A Customer Account
- Assuming both the front-end and back-end is running, then the user can register for a customer account.
- Registration as a customer can be completed in the following steps:
    - Navigate to the 'Register' link located on the top right of the header.
    - Press 'Register'
    - Enter sufficient, and legitimate details for existing inputs
        - Note: Password must be at least 5 characters or more
        - Note: Phone number should be between 8-10 characters
    - Submit, to successfully create your account.
 - You should now be redirected to your dashboard.
 ---
 ### How To: Registering An Employee Account
 - Assuming both the front-end and back-end is running, then the Admin can register an account for an employee.
 - Registration for an employee can be completed in the following steps:
    - Log in with your admin credentials
    - In the dashboard, navigate to 'Add Employee' button
    - Enter sufficient, and legitimate details for existing inputs
        - Note: Password must be at least 5 characters or more
        - Note: Phone number should be between 8-10 characters. 
    - Submit, to successfully create their account!
 - You should now be redirected to your dashboard.
 --- 
    
 ---
 ### How To: Add a service to an employee
 - Assuming both the front-end and back-end is running, then the Admin can edit an employees services.
 - navigate to localhost:3000/ChangeService
 - Under the Add a service, select the employee from the first dropdown box
 - Select the service to add from the second dropdown box
 - press the submit button
 - The Service is now Added to the employee
 --- 
 
 ---
 ### How To: Remove a service from an employee
 - Assuming both the front-end and back-end is running, then the Admin can edit an employees services.
 - navigate to localhost:3000/ChangeService
 - Under the Remove a service, select the employee from the first dropdown box
 - Select the service to add from the second dropdown box
 - press the submit button
 - The Service is now removed from the employee
 --- 
  ### How To: Create a booking
 - Assuming both the front-end and back-end is running, then a booking can be created.
 - Navigate to localhost:3000/Bookings (Found on the header banner)
 - Select a service
 - If available select an employee; after which the available times will be displayed
 - Hover over a time block to see the details
 - Click on a time block to submit the booking
 ---
 ### How To: Edit an employee's working hours
 - Assuming both the front-end and back-end is running, then a booking can be created.
 - Navigate to localhost:3000/Admin (Link on to edit provided on page)
 - Select an employee from the dropdown box.
 - Time blocks will be displayed in half hour increments. Green are scheduled, red are unscheduled.
 - Click and or drag to toggle a timeblock. (When the mouse leaves a block or is released on one the toggle with execute)
 - Toggled time blocks are automatically saved.
 - To delete hours, toggle all time blocks to red.
 - To add new hours select a date and press submit. A default time of 8:30 to 10:30 will be added to the desired day.
 ---  
