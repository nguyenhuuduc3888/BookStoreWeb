package all.repository;

import all.dto.StatisticalDto;
import all.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IStatisticalRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select book.book_name as name, sum(cd.quantity) as sumQuantity" +
            " from book join cart_detail cd on book.id = cd.book_id" +
            " join cart c on cd.cart_id = c.id" +
            " where c.create_date between :start_date and :end_date" +
            " group by cd.book_id order by sum(cd.quantity)" +
            "  limit 10", nativeQuery = true)
    List<StatisticalDto> getSellingBookTop10(@Param("start_date") String start_date,
                                             @Param("end_date") String end_date);

}
