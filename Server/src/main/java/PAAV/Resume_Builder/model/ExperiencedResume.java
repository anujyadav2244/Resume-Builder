package PAAV.Resume_Builder.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "experienced_resumes")
@Data // Generates Getters, Setters, toString, equals, and hashCode
@AllArgsConstructor // Generates a constructor with all fields
@NoArgsConstructor  // Generates a no-args constructor
public class ExperiencedResume {
    
    @Id
    private String id;
    private String userId;
    private String templateName;
    private String name;
    private String jobTitle;
    private Contact contact;
    private String professionalSummary;
    private List<WorkExperience> workExperience;
    private List<Education> education;
    private List<Certification> certifications;
    private List<String> technicalSkills;
    private List<String> softSkills;
    private List<String> achievements;
    private List<Language> languages;
    private List<String> hobbies;
    private String image;
}

// Contact Class
@Data
@AllArgsConstructor
@NoArgsConstructor
class Contact {
    private String phone;
    private String email;
    private String address;
    private String linkedin;
}

// WorkExperience Class
@Data
@AllArgsConstructor
@NoArgsConstructor
class WorkExperience {
    private String company;
    private String position;
    private String startDate;
    private String endDate;
    private List<String> responsibilities;
}

// Education Class
@Data
@AllArgsConstructor
@NoArgsConstructor
class Education {
    private String degree;
    private String institution;
    private String startYear;
    private String endYear;
}

// Certification Class
@Data
@AllArgsConstructor
@NoArgsConstructor
class Certification {
    private String title;
    private String institution;
    private String year;
}

// Language Class
@Data
@AllArgsConstructor
@NoArgsConstructor
class Language {
    private String language;
    private int familiarity;
}
