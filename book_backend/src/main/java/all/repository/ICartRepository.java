package all.repository;

import all.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "select cart.* from cart join app_user u on u.id =cart.app_user_id where u.id=:id", nativeQuery = true)
    List<Cart> findByAppUserId(@Param("id") int id);
}
