package urlshortener.models.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import urlshortener.models.User;

@Repository
@Transactional
public class UserDao {

  public void create(User user) {
	if (!entityManager.contains(user))
		entityManager.persist(user);
    return;
  }
  
  
  public void delete(User user) {
    if (entityManager.contains(user))
      entityManager.remove(user);
    else
      entityManager.remove(entityManager.merge(user));
    return;
  }
  
  @SuppressWarnings("unchecked")
  public List<User> getAll() {
    return entityManager.createQuery("from User").getResultList();
  }
  
  
  public User getByEmailPassword(String email, String password) {
	  Query query = entityManager.createQuery(
		        "from User where email = :email and password = :password");
	  query.setParameter("email", email);
	  query.setParameter("password", password);
	  return (User) query.getSingleResult();
  }

  
  public User getById(long id) {
    return entityManager.find(User.class, id);
  }

  
  public void update(User user) {
    entityManager.merge(user);
    return;
  }

  @PersistenceContext
  private EntityManager entityManager;
  
} 
