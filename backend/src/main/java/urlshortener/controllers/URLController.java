package urlshortener.controllers;

import org.springframework.web.bind.annotation.RestController;

import urlshortener.models.Url;
import urlshortener.models.User;
import urlshortener.models.dao.UrlDao;
import urlshortener.models.dao.UserDao;
import utils.URLShortener;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class URLController {
	
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value="/generate_url",method=RequestMethod.POST)
    public Url generate_url(@RequestBody Map<String, String> payload) throws IOException{
    	String url = payload.get("url");
    	Url urlRecord;
    	try {
    		urlRecord = urlDao.getByUrl(url);
    	}
    	catch (Exception ex) {
	    	URLShortener u = new URLShortener(5, "http://localhost:3000");
	    	urlRecord = new Url(url, u.shortenURL(url));
	    	urlDao.create(urlRecord);
    	}
    	return urlRecord;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value="/geturl",method=RequestMethod.POST)
    public Url geturl(@RequestBody Map<String, String> payload) throws IOException{
    	String url = payload.get("shortened");
    	String token = payload.get("token");
    	Url urlRecord;
    	urlRecord = urlDao.getByShortened(url);
    	User user = userDao.getByToken(token);
    	urlRecord.users.add(user);
    	urlDao.update(urlRecord);
    	return urlRecord;
    }
    	
    
    @Autowired
    public UrlDao urlDao;
    
    @Autowired
    public UserDao userDao;
    
}
