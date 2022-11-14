package all.service.impl;

import all.dto.CartDetailDto;
import all.model.AppUser;
import all.model.Book;
import all.model.Cart;
import all.model.CartDetail;
import all.repository.UserRepository;
import all.repository.UserRoleRepository;
import all.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public List<AppUser> findAll() {
        return userRepository.findAll();
    }

    @Override
    public AppUser findByName(String name) {
        return userRepository.findAppUserByName(name);
    }


    @Override
    public AppUser findHistory(String username) {
        return userRepository.findHistory(username);
    }

    @Override
    public String existsByUserName(String username) throws MessagingException, UnsupportedEncodingException {
        String user = userRepository.existsByUserName(username);
        AppUser appUser = userRepository.findAppUserByName(username);
        if (user != null) {
            sendVerificationEmailForResetPassWord(username, appUser.getEmail());
        }
        return user;
    }

    @Override
    public void saveNewPassword(String password, String name) {
        userRepository.saveNewPassword(password, name);
    }


    public void sendVerificationEmailForResetPassWord(String userName, String email) throws MessagingException, UnsupportedEncodingException {
        String subject = "Hãy xác thực email của bạn";
        String mailContent = "";
        String confirmUrl = "http://localhost:4200/verify-reset-password/" + userName;
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("sangnguyenjp97@gmail.com", "CODE GYM");
        helper.setTo(email);
        helper.setSubject(subject);
        mailContent = "<p sytle='color:red;'>Xin chào " + userName + " ,<p>" + "<p> Nhấn vào link sau để xác thực email của bạn:</p>" +
                "<h3><a href='" + confirmUrl + "'>Link Xác thực( nhấn vào đây)!</a></h3>" +
                "<p>CODE GYM</p>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }


    @Override
    public void save(AppUser appUser) {
        if (userRepository.findAppUserByName(appUser.getUsername()) != null) {
            return;
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encryptedPassword = passwordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encryptedPassword);
        userRepository.save(appUser.getUsername(), appUser.getPassword(), appUser.getEmail());
        List<AppUser> appUsers = userRepository.findAll();
        userRoleRepository.save(appUsers.toArray().length);
    }

    @Override
    public Optional<AppUser> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void edit(AppUser appUser) {
        userRepository.edit(appUser.getUsername(), appUser.getPassword(), appUser.getEmail(), appUser.getId());
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteUser(id);
    }

    @Override
    public Boolean existsUsername(String username) {
        return username.equals(userRepository.existsUsername(username));
    }

    @Override
    public Boolean existsEmail(String email) {
        return email.equals(userRepository.existsEmail(email));
    }

    @Override
    public void sendEmail(Cart cart, List<CartDetailDto> cartDetails) throws MessagingException, UnsupportedEncodingException {
        double totalMany = 0;
        String name = "";
        int quantity = 0;
        double many = 0;
        for (CartDetailDto item : cartDetails) {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setBook(item.getBook());
            cartDetail.setQuantity(item.getQuantity());
            quantity = cartDetail.getQuantity();
            many = cartDetail.getBook().getPrice();
            totalMany = item.getQuantity() * item.getBook().getPrice();
            name = item.getBook().getBookName();
        }
        Book book = new Book();
        String subject = "Đơn thanh toán của bạn";
        String mailContent = "";
//        String confirmUrl = "http://localhost:4200/verify-reset-password/" + userName;
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("nguyenhuuduc3888@gmail.com", "Book Store");
        helper.setTo(cart.getUser().getEmail());
        helper.setSubject(subject);
        mailContent = "<h1 style='color:red'>Xin chào: " + cart.getUser().getName() + "</h1>" +
                "<h2 style ='color:green'> Thanh toán thành công" +
                "<br>" +
                " số lượng: " + quantity +
                "<br>" +
                " giá tiền: " + many +
                "<br>" +
                " tổng tiền: " + totalMany +
                "<br>" +
                " tên sách: " + name +
                "<br>" +
                " vào ngày " + cart.getCreateDate() +
                "<br>" +
                " giờ " + cart.getCreateTime() +
                "<br>" +
                "</h2 > " +
                "<h3 style='color:red'>Cảm ơn đã mua hàng tại shop của chúng tôi </h3>" +
                "<span style='color:red'>" + " --BookStore-- " + "</span>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);

    }
}
