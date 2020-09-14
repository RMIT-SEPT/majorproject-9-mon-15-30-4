package com.sept.majorproject.group09.mon.sbbackend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sept.majorproject.group09.mon.sbbackend.model.Booking;
import com.sept.majorproject.group09.mon.sbbackend.web.BookingController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.util.Calendar;
import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@WebAppConfiguration
public class BookingTest {
    protected MockMvc mvc;

    @Autowired
    WebApplicationContext webApplicationContext;

    @Test
    public void contextLoads() {
        assertNotNull(webApplicationContext);
    }

    protected void setUp() {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    protected String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
    protected <T> T mapFromJson(String json, Class<T> clazz)
            throws JsonParseException, JsonMappingException, IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, clazz);
    }

    @Test
    public void getBookingsList() throws Exception {
        setUp();
        String url = "/api/bookings/all";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(url)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Booking[] bookings = mapFromJson(content, Booking[].class);
        assertTrue(bookings.length > 0);
    }

    @Test
    public void createBooking() throws Exception {
        setUp();
        String url = "/api/bookings";
        Calendar date = Calendar.getInstance();
        date.setTimeZone(TimeZone.getTimeZone("GMT+0"));

        date.set(2020, Calendar.AUGUST, 17, 8, 30);


        String inputJson = mapToJson(new Booking(date.getTime(), 1, "1", "1"));
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        System.out.print(content);
        assertTrue(Integer.parseInt(content) > 0);
    }

    @Test
    public void createBooking_Invalid() throws Exception {
        setUp();
        String url = "/api/bookings";

        String inputJson = mapToJson(new Booking(null, 1, "1", "1"));
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(400, status);
    }

    @Test
    public void getBookingsList_ByEmployee() throws Exception {
        setUp();
        String url = "/api/bookings/1";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(url)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Booking[] bookings = mapFromJson(content, Booking[].class);
        assertTrue(bookings.length > 0);
    }

    @Test
    public void getBookings_InvalidUrl() throws Exception {
        setUp();
        String url = "/api/bookings/fake/url/1";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(url)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(404, status);
    }
}



