package com.company.ems.repository;

import com.company.ems.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    List<LeaveRequest> findByManagerId(Long managerId);
    List<LeaveRequest> findByDepartmentId(Long departmentId);
    
    @Query("SELECT l FROM LeaveRequest l WHERE l.employee.username = :username " +
    	       "AND ((l.startDate <= :endDate AND l.endDate >= :startDate))")
    	List<LeaveRequest> findOverlappingLeaves(
    	    @Param("username") String username,
    	    @Param("startDate") LocalDate startDate,
    	    @Param("endDate") LocalDate endDate
    	);
}
