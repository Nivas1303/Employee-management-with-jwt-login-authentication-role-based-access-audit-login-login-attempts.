package com.employee.Emp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee.Emp.model.Emp;

public interface Repository extends JpaRepository<Emp, Long> {
}