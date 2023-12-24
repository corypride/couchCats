package org.launchcode.couchcatbackend.data;

import org.launchcode.couchcatbackend.models.UserMovieLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMovieLogRepository extends CrudRepository<UserMovieLog, UserMovieLog.UserMovieLogId> {
    List<UserMovieLog> findByIdUserId(int userId);
}
