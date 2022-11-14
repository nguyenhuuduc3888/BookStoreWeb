package all.controller;

import all.dto.CartDetailDto;
import all.dto.CartDto;
import all.dto.HistoryDto;
import all.dto.StatisticalDto;
import all.model.*;
import all.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedList;
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
    @Autowired
    ICartService cartService;
    @Autowired
    ICartDetailService cartDetailService;
    @Autowired
    IStatisticalService statisticalService;

    @GetMapping("/user")
    public ResponseEntity<List<AppUser>> getInfor() {
        List<AppUser> users = userService.findAll();
        users.get(0);
        users.get(1);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/user-detail/{username}")
    public ResponseEntity<AppUser> detail(@PathVariable String username) {
        AppUser appUser = userService.findByName(username);
        return new ResponseEntity<>(appUser, HttpStatus.OK);
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
        book.setDeleted(false);
        bookService.save(book);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> update(@PathVariable int id, @RequestBody Book book) {
        book.setDeleted(false);
        book.setId(id);
        bookService.save(book);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable int id) {
        bookService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/save-cart/{username}")
    public ResponseEntity<List<CartDetailDto>> saveCart(@PathVariable String username,
                                                        @RequestBody List<CartDetailDto> cartDetails) throws MessagingException, UnsupportedEncodingException {
        AppUser appUser = userService.findByName(username);
        Cart cart = new Cart();
        cart.setCreateDate(LocalDate.now());
        cart.setCreateTime(LocalTime.now());
        cart.setUser(appUser);
        cart.setDeleted(false);
        cart = cartService.save(cart);
        for (CartDetailDto item : cartDetails) {
            item.setBook(bookService.finById(item.getBook().getId()));
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setBook(item.getBook());
            cartDetail.setQuantity(item.getQuantity());
            cartDetailService.save(cartDetail);
        }
        userService.sendEmail(cart, cartDetails);
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }


    @GetMapping("/history/{username}")
    public ResponseEntity<HistoryDto> getHistory(@PathVariable String username) {
        HistoryDto history = new HistoryDto();
        AppUser appUser = userService.findHistory(username);
        BeanUtils.copyProperties(appUser, history);
        List<Cart> carts = cartService.findByAppUserId(history.getId());
        List<CartDto> cartDtos = new LinkedList<>();
        for (Cart cart : carts) {
            cartDtos.add(new CartDto(cart.getId(), cart.getCreateDate().toString(), cart.getCreateTime().toString()));
        }
        history.setCarts(cartDtos);
        for (CartDto item : history.getCarts()) {
            List<CartDetail> cartDetails = cartDetailService.findCartDetail(item.getId());
            List<CartDetailDto> cartDetailDtos = new LinkedList<>();
            for (CartDetail cartDetail : cartDetails) {
                cartDetailDtos.add(new CartDetailDto(cartDetail.getQuantity(), cartDetail.getBook()));
            }
            item.setCartDetails(cartDetailDtos);
        }
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @GetMapping("/statistic/{startDate}/{endDate}")
    public ResponseEntity<List<StatisticalDto>> getSellingBookTop10(@PathVariable String startDate, @PathVariable String endDate) {
        List<StatisticalDto> statisticDto = statisticalService.getList(startDate, endDate);
        if (statisticDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(statisticDto, HttpStatus.OK);
    }


    @GetMapping("/top-6")
    public ResponseEntity<List<StatisticalDto>> getListBookTop6() {
        List<StatisticalDto> statisticDto = bookService.getListTop6();
        if (statisticDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(statisticDto, HttpStatus.OK);
    }

    @PostMapping("/facebook")
    public ResponseEntity<Object> addUser(@RequestBody AppUser user) {
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}