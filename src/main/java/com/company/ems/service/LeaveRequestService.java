package com.company.ems.service;

import com.company.ems.dto.LeaveRequestDTO;
import com.company.ems.model.*;
import com.company.ems.repository.*;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveRequestService {
    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;

    
    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, UserRepository userRepository) {
		super();
		this.leaveRequestRepository = leaveRequestRepository;
		this.userRepository = userRepository;
	}

	public LeaveRequest applyLeave(LeaveRequestDTO dto, String username) {
        User emp = userRepository.findByUsername(username).orElseThrow();
        LeaveRequest req = new LeaveRequest();
        req.setEmployee(emp);
        req.setManager(emp.getManager());
        req.setDepartment(emp.getDepartment());
        req.setLeaveType(dto.getLeaveType());
        req.setStartDate(LocalDate.parse(dto.getStartDate()));
        req.setEndDate(LocalDate.parse(dto.getEndDate()));
        req.setReason(dto.getReason());
        req.setStatus(LeaveStatus.APPLIED);
        return leaveRequestRepository.save(req);
    }

    public LeaveRequest approveLeave(Long id, String managerUsername) {
        LeaveRequest req = leaveRequestRepository.findById(id).orElseThrow();
        User manager = userRepository.findByUsername(managerUsername).orElseThrow();
        if (!req.getManager().getId().equals(manager.getId()))
            throw new RuntimeException("Not authorized to approve");
        req.setStatus(LeaveStatus.APPROVED);
        return leaveRequestRepository.save(req);
    }

    public LeaveRequest rejectLeave(Long id, String managerUsername) {
        LeaveRequest req = leaveRequestRepository.findById(id).orElseThrow();
        User manager = userRepository.findByUsername(managerUsername).orElseThrow();
        if (!req.getManager().getId().equals(manager.getId()))
            throw new RuntimeException("Not authorized to reject");
        req.setStatus(LeaveStatus.REJECTED);
        return leaveRequestRepository.save(req);
    }

    public List<LeaveRequest> getEmployeeLeaves(String username) {
        User emp = userRepository.findByUsername(username).orElseThrow();
        return leaveRequestRepository.findByEmployeeId(emp.getId());
    }

    public List<LeaveRequest> getManagerLeaves(String username) {
        User manager = userRepository.findByUsername(username).orElseThrow();
        return leaveRequestRepository.findByManagerId(manager.getId());
    }

    public List<LeaveRequest> getDepartmentLeaves(Long departmentId) {
        return leaveRequestRepository.findByDepartmentId(departmentId);
    }
}
