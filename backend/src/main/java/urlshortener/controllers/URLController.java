package urlshortener.controllers;

import org.springframework.web.bind.annotation.RestController;

import urlshortener.models.Url;
import urlshortener.models.dao.UrlDao;
import utils.URLShortener;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class URLController {
    
    @RequestMapping(value="/generate_url",method=RequestMethod.POST)
    public Url generate_url(@RequestBody Map<String, String> payload) throws IOException{
    	String url = payload.get("url");
    	Url urlRecord;
    	try {
    		urlRecord = urlDao.getByUrl(url);
    	}
    	catch (Exception ex) {
    		System.out.println(ex.getMessage());
	    	URLShortener u = new URLShortener(5, "http://localhost:8080");
	    	urlRecord = new Url(url, u.shortenURL(url));
	    	urlDao.create(urlRecord);
    	}
    	return urlRecord;
    }
    
    @RequestMapping(value="/geturl",method=RequestMethod.POST)
    public Url geturl(@RequestBody Map<String, String> payload) throws IOException{
    	String url = payload.get("shortened");
    	Url urlRecord;
    	urlRecord = urlDao.getByShortened(url);
    	return urlRecord;
    }
    	
    
    @Autowired
    public UrlDao urlDao;
    
}
