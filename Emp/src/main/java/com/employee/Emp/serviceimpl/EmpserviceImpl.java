package com.employee.Emp.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.employee.Emp.model.Emp;
import com.employee.Emp.repository.Repository;
import com.employee.Emp.service.EmpService;

@Service
public class EmpserviceImpl implements EmpService {
	private final Repository repo;
	public EmpserviceImpl(Repository repo) {
		this.repo=repo;
	}
	@Override
	public List<Emp>getallEmployees(){
		return repo.findAll();
	}
	@Override
	public Emp saveEmployee(Emp emp) {
		return repo.save(emp);
	}
	@Override
	public Emp getEmployeeById(Long id) {
		return repo.findById(id).orElse(null);
	}

	@Override
    public Emp updateEmployee(Long id, Emp emp) {
        Emp existingEmp = repo.findById(id).orElse(null);
        if (existingEmp != null) {
            existingEmp.setFirstname(emp.getFirstname());
            existingEmp.setLastName(emp.getLastName());
            existingEmp.setDOB(emp.getDOB());
            existingEmp.setAddress(emp.getAddress());
            existingEmp.setPhonenumber(emp.getPhonenumber());
            existingEmp.setEmail(emp.getEmail());
            return repo.save(existingEmp);
        }
        return null;
    }
	@Override
	public void deleteEmployee(Long id) {
		repo.deleteById(id);
	}

}
