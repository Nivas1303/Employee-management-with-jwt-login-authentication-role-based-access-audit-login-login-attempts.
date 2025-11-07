package com.employee.Emp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "employee")
public class Emp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String Firstname;

    @NotBlank
    private String LastName;

    @NotBlank
    private String DOB;

    @NotBlank
    private String address;

    @NotBlank
    private String phonenumber;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    public Emp() {}

    public Emp(String Firstname, String LastName, String DOB, String address, String phonenumber, String email) {
        this.Firstname = Firstname;
        this.LastName = LastName;
        this.DOB = DOB;
        this.address = address;
        this.phonenumber = phonenumber;
        this.email = email;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstname() { return Firstname; }
    public void setFirstname(String Firstname) { this.Firstname = Firstname; }

    public String getLastName() { return LastName; }
    public void setLastName(String LastName) { this.LastName = LastName; }

    public String getDOB() { return DOB; }
    public void setDOB(String DOB) { this.DOB = DOB; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhonenumber() { return phonenumber; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}