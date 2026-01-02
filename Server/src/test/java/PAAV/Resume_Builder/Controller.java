package PAAV.Resume_Builder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/get")
    public String doGet() {
        return "Welcome to the Controller";
    }

}
