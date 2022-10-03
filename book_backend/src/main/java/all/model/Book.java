package all.model;
import javax.persistence.*;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String bookName;
    private double price;
    private String author;
    private String codeBook;
    private String image;
    private int totalPages;
    private String size;
    private String publicationCompany;
    @Column(columnDefinition = "LONGTEXT")
    private String introduce;
    @Column(columnDefinition = "DATE")
    private LocalDate releaseDate;
    @Column(columnDefinition = "BIT(1) default 0")
    private Boolean isDeleted;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;
}
