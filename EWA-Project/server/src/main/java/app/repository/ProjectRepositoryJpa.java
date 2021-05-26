package app.repository;

import app.entities.Project;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import java.util.List;

@Repository("PROJECT.JPA")
public class ProjectRepositoryJpa extends AbstractEntityRepositoryJpa<Project> {

  public ProjectRepositoryJpa() {
    super(Project.class);
  }

  @Override
  public List<Project> findAll() {
    return em.createNativeQuery("SELECT * from project", Project.class).getResultList();
  }

  public List<Project> threeFiltersFind(String start, String end, String type) {
    Query q = em.createNativeQuery("SELECT * from project WHERE start_date >= ?1 AND end_date <= ?2 AND type LIKE ?3",
      Project.class);
    q.setParameter(1, start);
    q.setParameter(2, end);
    q.setParameter(3, "%" + type + "%");
    return q.getResultList();
  }

  public List<Project> fourFiltersFind(String start, String end, String title, String hood) {
    Query q = em.createNativeQuery("SELECT * from project WHERE start_date >= ?1 AND end_date <= ?2 AND name LIKE ?3 AND neighbourhood LIKE ?4", Project.class);
    q.setParameter(1, start);
    q.setParameter(2, end);
    q.setParameter(3, "%" + title + "%");
    q.setParameter(4, "%" + hood + "%");
    return q.getResultList();
  }

  public List<Project> datesHoodFilters(String start, String end, String hood) {
    Query q = em.createNativeQuery("SELECT * from project WHERE start_date >= ?1 AND end_date <= ?2 AND neighbourhood LIKE ?3", Project.class);
    q.setParameter(1, start);
    q.setParameter(2, end);
    q.setParameter(3, "%" + hood + "%");
    return q.getResultList();
  }

  public List<Project> datesTitleFilters(String start, String end, String title) {
    Query q = em.createNativeQuery("SELECT * from project WHERE start_date >= ?1 AND end_date <= ?2 AND name LIKE ?3", Project.class);
    q.setParameter(1, start);
    q.setParameter(2, end);
    q.setParameter(3, "%" + title + "%");
    return q.getResultList();
  }

  public List<Project> datesFilters(String start, String end) {
    Query q = em.createNativeQuery("SELECT * from project WHERE start_date >= ?1 AND end_date <= ?2", Project.class);
    q.setParameter(1, start);
    q.setParameter(2, end);
    return q.getResultList();
  }
}
