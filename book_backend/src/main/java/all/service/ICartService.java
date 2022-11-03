package all.service;

import all.model.Cart;

import java.util.List;

public interface ICartService {
    Cart save(Cart cart);

    List<Cart> findByAppUserId(int id);
}
