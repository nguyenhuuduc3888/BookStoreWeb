package all.controller;

import all.model.AppUser;
import all.model.Book;
import all.model.Category;
import all.service.IBookService;
import all.service.ICategoryService;
import all.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/book")
public class BookRestController {
    @Autowired
    IBookService bookService;
    @Autowired
    ICategoryService categoryService;
    @Autowired
    IUserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<AppUser>> getInfor() {
        List<AppUser> users = userService.findAll();
        users.get(0);
        users.get(1);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/list")

    public ResponseEntity<List<Book>> findAll() {
        List<Book> books = bookService.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Book>> findAllAndSearch(@PageableDefault(value = 6) Pageable pageable,
                                                       @RequestParam Optional<String> keySearch,
                                                       @RequestParam Optional<String> keySearch1,
                                                       @RequestParam Optional<String> keySearch2) {
        String categorySearch = keySearch.orElse("");
        String authorSearch = keySearch1.orElse("");
        String nameSearch = keySearch2.orElse("");
        Page<Book> books = bookService.getAllAndSearch(pageable, categorySearch, authorSearch, nameSearch);
        if (books.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categoryList = categoryService.getList();
        if (categoryList.isEmpty()) {
            return new ResponseEntity<>(categoryList, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Book> detail(@PathVariable int id) {
        Book book = bookService.finById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Book> create(@RequestBody Book book) {
        book.setIsDeleted(false);
        bookService.save(book);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> update(@PathVariable int id, @RequestBody Book book) {
        book.setIsDeleted(false);
        book.setId(id);
        bookService.save(book);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable int id) {
        bookService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
