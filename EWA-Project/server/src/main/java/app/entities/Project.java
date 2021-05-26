package app.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Project implements Identifiable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  String name;
  String code;
  String location;
  Date startDate;
  Date endDate;
  double xCordinate;
  double yCordinate;
  String status;
  String description;
  String type;
  String neighbourhood;
  String image;

  @JsonIgnore
  @OneToMany(mappedBy = "project", cascade = CascadeType.PERSIST)
  List<QuestionnaireResult> questionnaireResults = new ArrayList<>();

  public Project() {
  }

  public Project(String name,
                 String code,
                 String location,
                 Date startDate,
                 Date endDate,
                 double xCordinate,
                 double yCordinate,
                 String type,
                 String neighbourhood,
                 String image,
                 String status,
                 String description) {
    this.name = name;
    this.code = code;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.xCordinate = xCordinate;
    this.yCordinate = yCordinate;
    this.status = status;
    this.description = description;
    this.type = type;
    this.neighbourhood = neighbourhood;
    this.image = image;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Project project = (Project) o;
    return id == project.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public long getId() {
    return id;
  }

  @Override
  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<QuestionnaireResult> getQuestionnaireResults() {
    return questionnaireResults;
  }

  public void setQuestionnaireResults(List<QuestionnaireResult> questionnaireResults) {
    this.questionnaireResults = questionnaireResults;
  }

  public double getxCordinate() {
    return xCordinate;
  }

  public void setxCordinate(double xCordinate) {
    this.xCordinate = xCordinate;
  }

  public double getyCordinate() {
    return yCordinate;
  }

  public void setyCordinate(double yCordinate) {
    this.yCordinate = yCordinate;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getNeighbourhood() {
    return neighbourhood;
  }

  public void setNeighbourhood(String neighbourhood) {
    this.neighbourhood = neighbourhood;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
