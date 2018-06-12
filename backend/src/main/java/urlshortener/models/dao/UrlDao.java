package urlshortener.models.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import urlshortener.models.Url;
import urlshortener.models.User;

@Repository
@Transactional
public class UrlDao {

  public void create(Url url) {
	if (!entityManager.contains(url))
		entityManager.persist(url);
    return;
  }
  
  
  public Url getByUrl(String url) {
    return (Url) entityManager.createQuery(
        "from Url where url = :url")
        .setParameter("url", url)
        .getSingleResult();
  }
  
  public Url getByShortened(String shortened) {
	    return (Url) entityManager.createQuery(
	        "from Url where shortened = :shortened")
	        .setParameter("shortened", shortened)
	        .getSingleResult();
	  }
  
  public void update(Url url) {
	    entityManager.merge(url);
	    return;
	  }


  @PersistenceContext
  private EntityManager entityManager;
  
} 
