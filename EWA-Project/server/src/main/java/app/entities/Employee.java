package app.entities;


import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Employee implements Identifiable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  String email;
  String password;
  String name;
  String image;
  String department;
  String district;
  String phoneNumber;
  String lastName;
  Date startDate;
  boolean admin;


  public Employee() {}

  public Employee(String name, String lastName, String email, String password, boolean admin,
                  String department, String district, String phoneNumber, String image, Date startDate) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.department = department;
    this.district = district;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.startDate = startDate;
  }

  public long getId() {
    return id;
  }

  @Override
  public void setId(long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public boolean getAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    admin = admin;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

  public String getDistrict() {
    return district;
  }

  public void setDistrict(String district) {
    this.district = district;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Employee employee = (Employee) o;
    return id == employee.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
