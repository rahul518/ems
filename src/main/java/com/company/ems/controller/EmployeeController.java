package com.company.ems.controller;

import com.company.ems.dto.LeaveRequestDTO;
import com.company.ems.model.LeaveRequest;
import com.company.ems.service.LeaveRequestService;
import com.company.ems.repository.UserRepository;
import com.company.ems.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeController {
    private final LeaveRequestService leaveRequestService;
    private final UserRepository userRepository;

    
    
    public EmployeeController(LeaveRequestService leaveRequestService, UserRepository userRepository) {
		super();
		this.leaveRequestService = leaveRequestService;
		this.userRepository = userRepository;
	}

	// Apply for leave
    @PostMapping("/leaves")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequestDTO dto, Principal principal) {
        return ResponseEntity.ok(leaveRequestService.applyLeave(dto, principal.getName()));
    }

    // View all own leaves
    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getLeaves(Principal principal) {
        return ResponseEntity.ok(leaveRequestService.getEmployeeLeaves(principal.getName()));
    }

    // Update profile (for simplicity, only name; extend as needed)
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updated, Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        user.setFullName(updated.getFullName());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
