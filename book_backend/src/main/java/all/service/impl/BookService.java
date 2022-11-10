package all.service.impl;

import all.dto.StatisticalDto;
import all.model.Book;
import all.repository.IBookRepository;
import all.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService implements IBookService {
    @Autowired
    IBookRepository bookRepository;

    @Override
    public Page<Book> getAllAndSearch(Pageable pageable, String keySearch, String keySearch1, String keySearch2) {
        return bookRepository.getAllAndSearch(pageable, "%" + keySearch + "%", "%" + keySearch1 + "%", "%" + keySearch2 + "%");
    }

    @Override
    public Book finById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public void save(Book book) {
        bookRepository.save(book);
    }

    @Override
    public void delete(int id) {
        bookRepository.delete(id);
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public List<StatisticalDto> getListTop6() {
        return bookRepository.getBookTop6();
    }
}
