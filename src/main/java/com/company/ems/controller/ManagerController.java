package com.company.ems.controller;

import com.company.ems.model.*;
import com.company.ems.repository.*;
import com.company.ems.service.LeaveRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
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
    public ResponseEntity<List<User>> getEmployees(Principal principal) {
        User manager = userRepository.findByUsername(principal.getName()).orElseThrow();
        // All employees who report to this manager
        return ResponseEntity.ok(userRepository.findByManagerId(manager.getId()));
    }

    // All leave requests for this manager's employees
    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getLeaves(Principal principal) {
        return ResponseEntity.ok(leaveRequestService.getManagerLeaves(principal.getName()));
    }

    // Approve a leave
    @PostMapping("/leaves/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id, Principal principal) {
        leaveRequestService.approveLeave(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    // Reject a leave
    @PostMapping("/leaves/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id, Principal principal) {
        leaveRequestService.rejectLeave(id, principal.getName());
        return ResponseEntity.ok().build();
    }
}
