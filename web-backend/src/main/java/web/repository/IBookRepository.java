package repository;

import model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IBookRepository extends JpaRepository<Book, Integer> {
//    @Query('select book.* from book join category on category.id = book.category_id where category.name like :=nameSearch')
}
