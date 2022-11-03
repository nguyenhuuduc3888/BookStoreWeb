package all.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
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

    @JsonIgnore
    @OneToMany(mappedBy = "book")
    private List<CartDetail> cartDetails;

    public Book(int id, String bookName, double price, String author, String codeBook, String image, int totalPages, String size, String publicationCompany, String introduce, LocalDate releaseDate, Boolean isDeleted, Category category, List<CartDetail> cartDetails) {
        this.id = id;
        this.bookName = bookName;
        this.price = price;
        this.author = author;
        this.codeBook = codeBook;
        this.image = image;
        this.totalPages = totalPages;
        this.size = size;
        this.publicationCompany = publicationCompany;
        this.introduce = introduce;
        this.releaseDate = releaseDate;
        this.isDeleted = isDeleted;
        this.category = category;
        this.cartDetails = cartDetails;
    }

    public Book() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCodeBook() {
        return codeBook;
    }

    public void setCodeBook(String codeBook) {
        this.codeBook = codeBook;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getPublicationCompany() {
        return publicationCompany;
    }

    public void setPublicationCompany(String publicationCompany) {
        this.publicationCompany = publicationCompany;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<CartDetail> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(List<CartDetail> cartDetails) {
        this.cartDetails = cartDetails;
    }
}

