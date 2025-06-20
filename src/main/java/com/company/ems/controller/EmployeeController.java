package com.company.ems.controller;

import com.company.ems.dto.LeaveRequestDTO;
import com.company.ems.model.LeaveRequest;
import com.company.ems.service.LeaveRequestService;
import com.company.ems.repository.UserRepository;
import com.company.ems.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    private final LeaveRequestService leaveRequestService;
    private final UserRepository userRepository;

    public EmployeeController(LeaveRequestService leaveRequestService, UserRepository userRepository) {
        this.leaveRequestService = leaveRequestService;
        this.userRepository = userRepository;
    }

    // Apply for leave
    @PostMapping("/leaves")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequestDTO dto, @RequestParam String username) {
        return ResponseEntity.ok(leaveRequestService.applyLeave(dto, username));
    }

    
    

    // View all own leaves
    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getLeaves(@RequestParam String username) {
        return ResponseEntity.ok(leaveRequestService.getEmployeeLeaves(username));
    }

    // Update profile (for simplicity, only name; extend as needed)
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updated, @RequestParam String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        user.setFullName(updated.getFullName());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
