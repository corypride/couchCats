package org.launchcode.couchcatbackend.data;

import org.launchcode.couchcatbackend.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByEmail(String email);

    User findOneByEmailAndPassword(String email, String password);
}
