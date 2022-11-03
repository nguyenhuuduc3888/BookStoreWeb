package all.repository;

import all.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional

public interface ICartDetailRepository extends JpaRepository<CartDetail, Integer> {
    @Query(value = "select cart_detail.*,b.* from cart_detail" +
            " join cart c on c.id=cart_detail.cart_id" +
            " join book b on b.id=cart_detail.book_id" +
            " where cart_id=:id", nativeQuery = true)
    List<CartDetail> findCartDetail(@Param("id") int id);
}