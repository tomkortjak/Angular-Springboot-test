package app.repository;

import app.entities.Employee;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import java.util.List;

@Repository("EMPLOYEE.JPA")
public class EmployeeRepositoryJpa extends AbstractEntityRepositoryJpa<Employee> {

  public EmployeeRepositoryJpa() {
    super(Employee.class);
  }

  public List<Employee> findAll(String name, String email, String district) {
    if (name == null && email == null && district == null) {
      return em.createNativeQuery("SELECT * from employee", Employee.class).getResultList();
    } else if (name != null && email != null && district != null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE email LIKE ?1 AND district LIKE ?2 AND name LIKE ?3", Employee.class);
      q.setParameter(1, "%" + email + "%");
      q.setParameter(2, "%" + district + "%");
      q.setParameter(3, "%" + name + "%");
      return q.getResultList();
    } else if (name == null && email != null && district != null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE email LIKE ?1 AND district LIKE ?2", Employee.class);
      q.setParameter(1, "%" + email + "%");
      q.setParameter(2, "%" + district + "%");
      return q.getResultList();
    } else if (name != null && email != null && district == null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE email LIKE ?1 AND name LIKE ?2", Employee.class);
      q.setParameter(1, "%" + email + "%");
      q.setParameter(2, "%" + name + "%");
      return q.getResultList();
    } else if (name != null && email == null && district != null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE district LIKE ?1 AND name LIKE ?2", Employee.class);
      q.setParameter(1, "%" + district + "%");
      q.setParameter(2, "%" + name + "%");
      return q.getResultList();
    } else if (name != null && email == null && district == null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE name LIKE ?1", Employee.class);
      q.setParameter(1, "%" + name + "%");
      return q.getResultList();
    } else if (name == null && email != null && district == null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE email LIKE ?1", Employee.class);
      q.setParameter(1, "%" + email + "%");
      return q.getResultList();
    } else if (name == null && email == null && district != null) {
      Query q = em.createNativeQuery("SELECT * from employee WHERE district LIKE ?1", Employee.class);
      q.setParameter(1, "%" + district + "%");
      return q.getResultList();
    }
    return null;
  }
}
