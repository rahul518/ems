package com.company.ems.service;

import com.company.ems.dto.DepartmentDTO;
import com.company.ems.model.*;
import com.company.ems.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    
    public DepartmentService(DepartmentRepository departmentRepository, UserRepository userRepository) {
		super();
		this.departmentRepository = departmentRepository;
		this.userRepository = userRepository;
	}

	public Department createDepartment(DepartmentDTO dto) {
        Department dept = new Department();
        dept.setName(dto.getName());
        if (dto.getManagerId() != null) {
            User mgr = userRepository.findById(dto.getManagerId()).orElseThrow();
            dept.setManager(mgr);
        }
        return departmentRepository.save(dept);
    }

    public Department updateDepartment(Long id, DepartmentDTO dto) {
        Department dept = departmentRepository.findById(id).orElseThrow();
        dept.setName(dto.getName());
        if (dto.getManagerId() != null) {
            User mgr = userRepository.findById(dto.getManagerId()).orElseThrow();
            dept.setManager(mgr);
        }
        return departmentRepository.save(dept);
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElseThrow();
    }
}
