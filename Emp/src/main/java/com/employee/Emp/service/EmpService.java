package com.employee.Emp.service;

import java.util.List;

import com.employee.Emp.model.Emp;

public interface EmpService {
	List<Emp>getallEmployees();
	Emp saveEmployee(Emp emp);
	Emp getEmployeeById(Long id);
	Emp updateEmployee(Long id,Emp emp);
	void deleteEmployee(Long id);
}
