package com.company.ems.dto;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String role;
	public String getToken() {
		return token;
	}
	
	
	public JwtResponse(String token, String role) {
		super();
		this.token = token;
		this.role = role;
	}


	public void setToken(String token) {
		this.token = token;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
    
    
}
