package urlshortener.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import urlshortener.models.User;
import urlshortener.models.dao.UserDao;

/**
 * Class UserController
 */
@Controller
@RequestMapping(value="/user")
public class UserController {

  @RequestMapping(value="/create")
  @ResponseBody
  public String create(String email, String name) {
    try {
      User user = new User(email, name);
      userDao.create(user);
    }
    catch (Exception ex) {
      return "Error creating the user: " + ex.toString();
    }
    return "User succesfully created!";
  }
  

  @RequestMapping(value="/delete")
  @ResponseBody
  public String delete(long id) {
    try {
      User user = new User(id);
      userDao.delete(user);
    }
    catch (Exception ex) {
      return "Error deleting the user: " + ex.toString();
    }
    return "User succesfully deleted!";
  }
  
  @CrossOrigin(origins = "http://localhost:3000")
  @RequestMapping(value="/login")
  @ResponseBody
  public User login(@RequestBody Map<String, String> payload) {
    String email = payload.get("email");
    String password = payload.get("password");
    User user;
    try {
      user = userDao.getByEmailPassword(email, password);
      return user;
    }
    catch (Exception ex) {
      System.out.println(ex.getMessage());
      return null;
    }
    
  }
  
 
  @RequestMapping(value="/update")
  @ResponseBody
  public String updateName(long id, String email, String name) {
    try {
      User user = userDao.getById(id);
      user.setEmail(email);
      user.setName(name);
      userDao.update(user);
    }
    catch (Exception ex) {
      return "Error updating the user: " + ex.toString();
    }
    return "User succesfully updated!";
  } 

  @Autowired
  public UserDao userDao;
  
} 
