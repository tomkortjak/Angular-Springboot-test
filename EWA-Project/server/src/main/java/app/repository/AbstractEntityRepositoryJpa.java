package app.repository;

import app.entities.Identifiable;
import org.springframework.context.annotation.Primary;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Primary
@Transactional
public class AbstractEntityRepositoryJpa<E extends Identifiable> implements EntityRepository<E> {

  @PersistenceContext
  protected EntityManager em;

  private Class<E> theEntityClass;

  public AbstractEntityRepositoryJpa(Class<E> entityClass) {
    this.theEntityClass = entityClass;
  }

  @Override
  public List<E> findAll() {
    return em.createNativeQuery("SELECT a from ?1 a").setParameter(1, theEntityClass).getResultList();
  }

  @Override
  public E findById(long id) {
    return em.find(theEntityClass, id);
  }

  @Override
  public E save(E entity) {
    em.merge(entity);
    return entity;
  }

  @Override
  public boolean deleteById(long id) {
    try {
      em.remove(findById(id));
      return true;
    } catch (Exception e) {
      System.out.println(e);
      return false;
    }
  }
}
