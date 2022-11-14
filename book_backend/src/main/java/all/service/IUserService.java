package all.service;

import all.dto.CartDetailDto;
import all.model.AppUser;
import all.model.Cart;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<AppUser> findAll();

    AppUser findByName(String name);

    AppUser findHistory(String username);

    String existsByUserName(String username) throws MessagingException, UnsupportedEncodingException;

    void saveNewPassword(String password, String name);

    void save(AppUser appUser);

    Optional<AppUser> findById(Integer id);

    void edit(AppUser appUser);

    void deleteUser(int id);

    Boolean existsUsername(String username);

    Boolean existsEmail(String email);

    void sendEmail(Cart cart, List<CartDetailDto> cartDetails) throws MessagingException, UnsupportedEncodingException;
}
