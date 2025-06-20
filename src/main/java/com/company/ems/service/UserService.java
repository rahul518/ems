package com.company.ems.service;

import com.company.ems.dto.UserDTO;
import com.company.ems.model.*;
import com.company.ems.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    public UserService(UserRepository userRepository, DepartmentRepository departmentRepository) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }

    public User createUser(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword()); // <-- Save plain password
        user.setFullName(dto.getFullName());
        user.setRole(dto.getRole());
        if (dto.getDepartmentId() != null) {
            Department dep = departmentRepository.findById(dto.getDepartmentId()).orElseThrow();
            user.setDepartment(dep);
        }
        if (dto.getManagerId() != null) {
            User manager = userRepository.findById(dto.getManagerId()).orElseThrow();
            user.setManager(manager);
        }
        return userRepository.save(user);
    }

    public User updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id).orElseThrow();
        if (dto.getPassword() != null) {
            user.setPassword(dto.getPassword()); // <-- Save plain password
        }
        user.setFullName(dto.getFullName());
        user.setRole(dto.getRole());
        if (dto.getDepartmentId() != null) {
            Department dep = departmentRepository.findById(dto.getDepartmentId()).orElseThrow();
            user.setDepartment(dep);
        }
        if (dto.getManagerId() != null) {
            User manager = userRepository.findById(dto.getManagerId()).orElseThrow();
            user.setManager(manager);
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
