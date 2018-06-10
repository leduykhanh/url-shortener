package urlshortener.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "urls")
public class Url {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
    private  String url;
    private  String shortened;
    
    
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
            })
    @JoinTable(name = "url_user",
            joinColumns = { @JoinColumn(name = "url_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private Set<User> users = new HashSet<>();
    
    public Url() {}
    
    public Url(long id) {
    	this.id = id;
    }
    
    public Url(String url, String shortened) {   
        this.url = url;
        this.shortened = shortened;
    }

    public long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }
    
    public String getShortened() {
        return shortened;
    }
}
