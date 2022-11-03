package all.service;

import all.model.CartDetail;

import java.util.List;

public interface ICartDetailService {
    CartDetail save(CartDetail cartDetail);

    List<CartDetail> findCartDetail(Integer id);
}
