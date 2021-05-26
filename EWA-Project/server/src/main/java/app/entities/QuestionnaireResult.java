package app.entities;


import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
@NamedQueries({
  @NamedQuery(name ="Questionnaire_find_by_project",
    query = "SELECT q FROM QuestionnaireResult q WHERE q.project.id = ?1"),
})
@Entity
public class QuestionnaireResult implements Identifiable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  // Result data
  int exercise;
  int gardening;
  int experiencingNature;
  int meetingPeople;
  int restAndRelaxation;

  // Personal Information
  String zipcode;
  String sex;
  Date dateOfBirth;
  String email;

  @ManyToOne(cascade = CascadeType.PERSIST)
  Project project;

  public QuestionnaireResult() {}

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    QuestionnaireResult that = (QuestionnaireResult) o;
    return id == that.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public void addProject(Project project) {
    this.project = project;
  }

  @Override
  public long getId() {
    return id;
  }

  @Override
  public void setId(long id) {
    this.id = id;
  }

  public int getExercise() {
    return exercise;
  }

  public void setExercise(int exercise) {
    this.exercise = exercise;
  }

  public int getGardening() {
    return gardening;
  }

  public void setGardening(int gardening) {
    this.gardening = gardening;
  }

  public int getExperiencingNature() {
    return experiencingNature;
  }

  public void setExperiencingNature(int experiencingNature) {
    this.experiencingNature = experiencingNature;
  }

  public int getMeetingPeople() {
    return meetingPeople;
  }

  public void setMeetingPeople(int meetingPeople) {
    this.meetingPeople = meetingPeople;
  }

  public int getRestAndRelaxation() {
    return restAndRelaxation;
  }

  public void setRestAndRelaxation(int restAndRelaxation) {
    this.restAndRelaxation = restAndRelaxation;
  }

  public String getZipcode() {
    return zipcode;
  }

  public void setZipcode(String zipcode) {
    this.zipcode = zipcode;
  }

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  public Date getDateOfBirth() {
    return dateOfBirth;
  }

  public void setDateOfBirth(Date dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Project getProject() {
    return project;
  }

  public void setProject(Project project) {
    this.project = project;
  }
}
