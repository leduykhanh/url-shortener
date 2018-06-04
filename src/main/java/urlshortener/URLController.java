package urlshortener;

import org.springframework.web.bind.annotation.RestController;

import models.URLShortener;
import models.Url;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class URLController {
    
    @RequestMapping(value="/",method=RequestMethod.GET)
    public String index() {
        return "Greetings from Spring Boot!";
    }
    
    @RequestMapping(value="/geturl",method=RequestMethod.POST)
    public Url geturl(@RequestBody Map<String, String> payload) throws IOException{
    	String url = payload.get("url");
    	URLShortener u = new URLShortener(5, "http://localhost:8080");
        return new Url(1, u.shortenURL(url));
    }
    
}
