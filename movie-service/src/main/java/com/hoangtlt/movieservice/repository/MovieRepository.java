package com.hoangtlt.movieservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoangtlt.movieservice.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}