package all.service.impl;

import all.repository.ICartRepository;
import all.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import all.model.Cart;

import java.util.List;

@Service
public class CartService implements ICartService {

    @Autowired
    ICartRepository cartRepository;


    @Override
    public Cart save(Cart cart) {

        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> findByAppUserId(int id) {
        return cartRepository.findByAppUserId(id);
    }
}
