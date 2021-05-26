package app.repository;

import app.entities.QuestionnaireResult;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import java.util.List;

@Repository("QUESTIONNAIRE_RESULT.JPA")
public class QuestionnaireResultRepositoryJpa extends AbstractEntityRepositoryJpa<QuestionnaireResult> {

  public QuestionnaireResultRepositoryJpa() {
    super(QuestionnaireResult.class);
  }

  public List<QuestionnaireResult> findAll(long id) {
    Query q = em.createNativeQuery("SELECT * from questionnaire_result ", QuestionnaireResult.class);
    return q.getResultList();
  }

  public List<QuestionnaireResult> findByQuery(Object filter) {
    if (filter.getClass() == Long.class) {
      return em.createNamedQuery("Questionnaire_find_by_project").setParameter(1, filter).getResultList();
    }
    System.out.println("No class found");
    return null;
  }
}
