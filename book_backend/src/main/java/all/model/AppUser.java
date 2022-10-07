package all.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String address;

    @Column(columnDefinition = "BIT(1) DEFAULT 0")
    private Boolean isDeleted;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<UserRole> userRoles;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Cart> cart;
}
