package org.launchcode.couchcatbackend.data;

import org.launchcode.couchcatbackend.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
