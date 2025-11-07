package com.employee.Emp.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String action;
    private Date timestamp;

    
    private int attemptCount;

    
    public AuditLog() {}

    
    public AuditLog(String username, String action, Date timestamp, int attemptCount) {
        this.username = username;
        this.action = action;
        this.timestamp = timestamp;
        this.attemptCount = attemptCount;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }


public int getAttemptCount() {
    return attemptCount;
}

public void setAttemptCount(int attemptCount) {
    this.attemptCount = attemptCount;
}

}