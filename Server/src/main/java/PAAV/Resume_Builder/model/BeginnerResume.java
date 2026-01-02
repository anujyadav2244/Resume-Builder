package PAAV.Resume_Builder.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "beginner_resumes") // MongoDB Collection
public class BeginnerResume {

    @Id
    private String id;
    private String userId;
    private String templateName;

    private String name;
    private String jobTitle;
    private Contact contact;
    private List<String> technicalSkills;
    private List<String> hobbies;
    private String careerObjective;
    private List<Education> education;
    private List<String> personalSkills;
    private List<Certification> certifications;
    private List<Language> languages;
    private String image;

    // Default Constructor
    public BeginnerResume() {}

    // Parameterized Constructor
    public BeginnerResume(String userId, String templateName, String name, String jobTitle, Contact contact,
                          List<String> technicalSkills, List<String> hobbies, String careerObjective,
                          List<Education> education, List<String> personalSkills,
                          List<Certification> certifications, List<Language> languages, String image) {
        this.userId = userId;
        this.templateName = templateName;
        this.name = name;
        this.jobTitle = jobTitle;
        this.contact = contact;
        this.technicalSkills = technicalSkills;
        this.hobbies = hobbies;
        this.careerObjective = careerObjective;
        this.education = education;
        this.personalSkills = personalSkills;
        this.certifications = certifications;
        this.languages = languages;
        this.image = image;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public List<String> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(List<String> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    public String getCareerObjective() {
        return careerObjective;
    }

    public void setCareerObjective(String careerObjective) {
        this.careerObjective = careerObjective;
    }

    public List<Education> getEducation() {
        return education;
    }

    public void setEducation(List<Education> education) {
        this.education = education;
    }

    public List<String> getPersonalSkills() {
        return personalSkills;
    }

    public void setPersonalSkills(List<String> personalSkills) {
        this.personalSkills = personalSkills;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Inner classes (They should be separate files, but keeping them here for simplicity)

    public static class Contact {   
        private String phone;
        private String email;
        private String address;

        public Contact() {}

        public Contact(String phone, String email, String address) {
            this.phone = phone;
            this.email = email;
            this.address = address;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }

    public static class Education {
        private String degree;
        private String institution;
        private int startYear;
        private int endYear;

        public Education() {}

        public Education(String degree, String institution, int startYear, int endYear) {
            this.degree = degree;
            this.institution = institution;
            this.startYear = startYear;
            this.endYear = endYear;
        }

        public String getDegree() {
            return degree;
        }

        public void setDegree(String degree) {
            this.degree = degree;
        }

        public String getInstitution() {
            return institution;
        }

        public void setInstitution(String institution) {
            this.institution = institution;
        }

        public int getStartYear() {
            return startYear;
        }

        public void setStartYear(int startYear) {
            this.startYear = startYear;
        }

        public int getEndYear() {
            return endYear;
        }

        public void setEndYear(int endYear) {
            this.endYear = endYear;
        }
    }

    public static class Certification {
        private String title;
        private String description;

        public Certification() {}

        public Certification(String title, String description) {
            this.title = title;
            this.description = description;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class Language {
        private String language;
        private String familiarity;

        public Language() {}

        public Language(String language, String familiarity) {
            this.language = language;
            this.familiarity = familiarity;
        }

        public String getLanguage() {
            return language;
        }

        public void setLanguage(String language) {
            this.language = language;
        }

        public String getFamiliarity() {
            return familiarity;
        }

        public void setFamiliarity(String familiarity) {
            this.familiarity = familiarity;
        }
    }
}
