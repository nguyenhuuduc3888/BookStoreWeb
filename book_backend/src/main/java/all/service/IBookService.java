package all.service;
import all.dto.StatisticalDto;
import all.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookService {
    Page<Book> getAllAndSearch(Pageable pageable, String keySearch, String keySearch1, String keySearch2);

    Book finById(int id);

    void save(Book book);

    void delete(int id);

    List<Book> findAll();

    List<StatisticalDto> getListTop6();


}
