package all.repository;

import all.dto.StatisticalDto;
import all.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IBookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select book.* from `book`" +
            " join `category` on category.id = book.category_id " +
            "where category.category_name like :keySearch and author like :keySearch1 " +
            "and book_name like :keySearch2 and is_deleted = 0 order by id desc ", nativeQuery = true)
    Page<Book> getAllAndSearch(Pageable pageable, @Param("keySearch") String keySearch,
                               @Param("keySearch1") String keySearch1, @Param("keySearch2") String keySearch2);

    @Query(value = "select * from book where id = :id", nativeQuery = true)
    Book findById(@Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "update book set is_deleted = 1 where id=:id ", nativeQuery = true)
    void delete(@Param("id") int id);

    @Query(value = "select book.* , sum(cd.quantity) as sumQuantity" +
            " from book join cart_detail cd on book.id = cd.book_id" +
            " join cart c on cd.cart_id = c.id" +
            " group by cd.book_id order by sum(cd.quantity) desc" +
            "  limit 8", nativeQuery = true)
    List<StatisticalDto> getBookTop();

}
