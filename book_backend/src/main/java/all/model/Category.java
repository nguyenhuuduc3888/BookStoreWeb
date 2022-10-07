package all.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String categoryName;
    @Column(columnDefinition = "BIT(1) default 0")
    private Boolean isDelete;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Book> books;
}
