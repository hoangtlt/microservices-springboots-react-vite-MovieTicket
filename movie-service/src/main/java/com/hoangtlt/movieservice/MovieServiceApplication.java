package com.hoangtlt.movieservice;

import com.hoangtlt.movieservice.entity.Movie;
import com.hoangtlt.movieservice.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MovieServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(MovieRepository movieRepository) {

        return args -> {

            movieRepository.save(
                    new Movie(
                            null,
                            "Avengers Endgame",
                            "Action",
                            90000.0
                    )
            );

            movieRepository.save(
                    new Movie(
                            null,
                            "Doraemon Movie",
                            "Animation",
                            70000.0
                    )
            );

            movieRepository.save(
                    new Movie(
                            null,
                            "Conan Movie",
                            "Detective",
                            80000.0
                    )
            );
        };
    }
}