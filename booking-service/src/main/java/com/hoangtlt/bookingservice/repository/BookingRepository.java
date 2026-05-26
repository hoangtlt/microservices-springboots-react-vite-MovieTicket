package com.hoangtlt.bookingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoangtlt.bookingservice.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}