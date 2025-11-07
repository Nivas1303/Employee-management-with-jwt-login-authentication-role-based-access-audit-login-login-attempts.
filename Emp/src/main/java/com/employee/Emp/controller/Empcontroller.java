package com.employee.Emp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.employee.Emp.model.Emp;
import com.employee.Emp.service.EmpService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/emp")
public class Empcontroller {

    @Autowired
    private EmpService service;

    public Empcontroller(EmpService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/allemp")
    public List<Emp> getallEmployees() {
        return service.getallEmployees();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public Emp createEmp(@RequestBody Emp emp) {
        return service.saveEmployee(emp);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/updateemp/{id}")
    public Emp UpdateEmp(@PathVariable Long id, @RequestBody Emp emp) {
        return service.updateEmployee(id, emp);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/allemp/{id}")
    public Emp getEmployeebyId(@PathVariable Long id) {
        return service.getEmployeeById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
        return "employee deleted";
    }
}