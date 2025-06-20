package com.company.ems.controller;

import com.company.ems.model.*;
import com.company.ems.repository.*;
import com.company.ems.service.LeaveRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private final UserRepository userRepository;
    private final LeaveRequestService leaveRequestService;

    
    public ManagerController(UserRepository userRepository, LeaveRequestService leaveRequestService) {
		super();
		this.userRepository = userRepository;
		this.leaveRequestService = leaveRequestService;
	}

	// Employees in manager's department (or reporting to this manager)
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getEmployees(@RequestParam String username) {
        User manager = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(userRepository.findByManagerId(manager.getId()));
    }


    // All leave requests for this manager's employees
    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getLeaves(@RequestParam String username) {
        return ResponseEntity.ok(leaveRequestService.getManagerLeaves(username));
    }

    @PostMapping("/leaves/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id, @RequestParam String username) {
        leaveRequestService.approveLeave(id, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/leaves/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id, @RequestParam String username) {
        leaveRequestService.rejectLeave(id, username);
        return ResponseEntity.ok().build();
    }

}
