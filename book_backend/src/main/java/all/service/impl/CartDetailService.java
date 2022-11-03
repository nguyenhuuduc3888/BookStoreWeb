package all.service.impl;

import all.model.CartDetail;
import all.repository.ICartDetailRepository;
import all.service.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    ICartDetailRepository cartDetailRepository;

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public List<CartDetail> findCartDetail(Integer id) {
        return cartDetailRepository.findCartDetail(id);
    }
}
