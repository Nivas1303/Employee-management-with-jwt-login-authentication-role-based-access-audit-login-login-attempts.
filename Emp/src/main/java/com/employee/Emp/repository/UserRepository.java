package com.employee.Emp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.employee.Emp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
