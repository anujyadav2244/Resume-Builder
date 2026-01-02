package  PAAV.Resume_Builder.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
@Document(collection="users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    

    public User() {}

    public User(String password, String email) {
        this.password = password;
        this.email = email;
    }

}