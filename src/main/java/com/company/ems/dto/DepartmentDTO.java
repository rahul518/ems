package com.company.ems.dto;

import lombok.Data;

@Data
public class DepartmentDTO {
    private String name;
    private Long managerId;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getManagerId() {
		return managerId;
	}
	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}
    
    
}
