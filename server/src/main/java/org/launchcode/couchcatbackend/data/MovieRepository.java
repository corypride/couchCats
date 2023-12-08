package org.launchcode.couchcatbackend.data;

import org.launchcode.couchcatbackend.models.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
}
