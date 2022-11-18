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
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
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

        DecimalFormat formatter = new DecimalFormat("###,###,###.##");
        Date date = new Date();
        DateFormat dateFormat = null;
        DateFormat dateFormats = null;
        dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        dateFormats = new SimpleDateFormat("HH:mm:ss");
        int totalMoney = 0;
        int quantity = 0;
        for (int i = 0; i < cartDetails.size(); i++) {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setBook(cartDetails.get(i).getBook());
            cartDetail.setQuantity(cartDetails.get(i).getQuantity());
            quantity += cartDetail.getQuantity();
            totalMoney += cartDetails.get(i).getQuantity() * cartDetails.get(i).getBook().getPrice();
        }
        String subject = "Đơn thanh toán của bạn";
        String mailContent = "";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("nguyenhuuduc3888@gmail.com", "BookHouse");
        helper.setTo(cart.getUser().getEmail());
        helper.setSubject(subject);
        mailContent += "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Email</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            margin-top: 20px;\n" +
                "            color: #484b51;\n" +
                "        }\n" +
                "\n" +
                "        .text-secondary-d1 {\n" +
                "            color: #728299 !important;\n" +
                "        }\n" +
                "\n" +
                "        .page-header {\n" +
                "            margin: 0 0 1rem;\n" +
                "            padding-bottom: 1rem;\n" +
                "            padding-top: .5rem;\n" +
                "            border-bottom: 1px dotted #e2e2e2;\n" +
                "            display: -ms-flexbox;\n" +
                "            display: flex;\n" +
                "            -ms-flex-pack: justify;\n" +
                "            justify-content: space-between;\n" +
                "            -ms-flex-align: center;\n" +
                "            align-items: center;\n" +
                "        }\n" +
                "\n" +
                "        .page-title {\n" +
                "            padding: 0;\n" +
                "            margin: 0;\n" +
                "            font-size: 1.75rem;\n" +
                "            font-weight: 300;\n" +
                "        }\n" +
                "\n" +
                "        .brc-default-l1 {\n" +
                "            border-color: #dce9f0 !important;\n" +
                "        }\n" +
                "\n" +
                "        .ml-n1,\n" +
                "        .mx-n1 {\n" +
                "            margin-left: -.25rem !important;\n" +
                "        }\n" +
                "\n" +
                "        .mr-n1,\n" +
                "        .mx-n1 {\n" +
                "            margin-right: -.25rem !important;\n" +
                "        }\n" +
                "\n" +
                "        .mb-4,\n" +
                "        .my-4 {\n" +
                "            margin-bottom: 1.5rem !important;\n" +
                "        }\n" +
                "\n" +
                "        hr {\n" +
                "            margin-top: 1rem;\n" +
                "            margin-bottom: 1rem;\n" +
                "            border: 0;\n" +
                "            border-top: 1px solid rgba(0, 0, 0, .1);\n" +
                "        }\n" +
                "\n" +
                "        .text-grey-m2 {\n" +
                "            color: #888a8d !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-success-m2 {\n" +
                "            color: #86bd68 !important;\n" +
                "        }\n" +
                "\n" +
                "        .font-bolder,\n" +
                "        .text-600 {\n" +
                "            font-weight: 600 !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-110 {\n" +
                "            font-size: 110% !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-blue {\n" +
                "            color: #478fcc !important;\n" +
                "        }\n" +
                "\n" +
                "        .pb-25,\n" +
                "        .py-25 {\n" +
                "            padding-bottom: .75rem !important;\n" +
                "        }\n" +
                "\n" +
                "        .pt-25,\n" +
                "        .py-25 {\n" +
                "            padding-top: .75rem !important;\n" +
                "        }\n" +
                "\n" +
                "        .bgc-default-tp1 {\n" +
                "            background-color: rgba(121, 169, 197, .92) !important;\n" +
                "        }\n" +
                "\n" +
                "        .bgc-default-l4,\n" +
                "        .bgc-h-default-l4:hover {\n" +
                "            background-color: #f3f8fa !important;\n" +
                "        }\n" +
                "\n" +
                "        .page-header .page-tools {\n" +
                "            -ms-flex-item-align: end;\n" +
                "            align-self: flex-end;\n" +
                "        }\n" +
                "\n" +
                "        .btn-light {\n" +
                "            color: #757984;\n" +
                "            background-color: #f5f6f9;\n" +
                "            border-color: #dddfe4;\n" +
                "        }\n" +
                "\n" +
                "        .w-2 {\n" +
                "            width: 1rem;\n" +
                "        }\n" +
                "\n" +
                "        .text-120 {\n" +
                "            font-size: 120% !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-primary-m1 {\n" +
                "            color: #4087d4 !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-danger-m1 {\n" +
                "            color: #dd4949 !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-blue-m2 {\n" +
                "            color: #68a3d5 !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-150 {\n" +
                "            font-size: 150% !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-60 {\n" +
                "            font-size: 60% !important;\n" +
                "        }\n" +
                "\n" +
                "        .text-grey-m1 {\n" +
                "            color: #7b7d81 !important;\n" +
                "        }\n" +
                "\n" +
                "        .align-bottom {\n" +
                "            vertical-align: bottom !important;\n" +
                "        }\n" +
                "\n" +
                "        .table {\n" +
                "            width: 100%;\n" +
                "            border: 1px solid burlywood;\n" +
                "            text-align: center;\n" +
                "            border-radius: 10px;\n" +
                "        }\n" +
                "        thead tr th {\n" +
                "           }\n" +

                " .table tr:hover {\n" +
                "   background-color: #464A52;\n" +
                "   color: white;\n" +
                "-webkit-box-shadow: 0 6px 6px -6px #0E1119;\n" +
                "\t   -moz-box-shadow: 0 6px 6px -6px #0E1119;\n" +
                "\t        box-shadow: 0 6px 6px -6px #0E1119;\n" +
                "}    </style>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "    <div class=\"page-content container\">\n" +
                "\n" +
                "        <div class=\"container px-0\">\n" +
                "            <div class=\"row mt-4\">\n" +
                "                <div class=\"col-12 col-lg-12\">\n" +
                "                    <div class=\"row\">\n" +
                "                        <div class=\"col-12\">\n" +
                "                            <div style=\"text-align: center;\" >\n" +
                "                                <h1 class=\"text-default-d3\" style=\"text-align:center;color: coral;\">BookHouse</h1>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "            \n" +
                "                    <hr class=\"row brc-default-l1 mx-n1 mb-4\" />\n" +
                "\n" +
                "                    <div class=\"row\">\n" +
                "<h1 style='text-align:center;color: coral'> Thông báo thanh toán thành công đơn hàng tại BookHouse" + "</h1>" +
                "<div class=\"col-sm-6\" style=\"line-height:25px\">\n" +
                "                            <div>\n" +
                "                                <span class=\"text-sm text-grey-m2 align-middle\">Tên: </span>\n" +
                "                                <span class=\"text-600 text-110 text-blue align-middle\">" + cart.getUser().getName() + "</span>\n" +
                "                            </div>\n" +
                "                            <div>\n" +
                "                                <span class=\"text-sm text-grey-m2 align-middle\">Địa chỉ: </span>\n" +
                "                                <span class=\"text-600 text-110 text-blue align-middle\">" + cart.getUser().getAddress() + "</span>\n" +
                "                            </div>\n" +
                "                            <div>\n" +
                "                                <span class=\"text-sm text-grey-m2 align-middle\">Số điện thoại:</span>\n" +
                "                                <span class=\"text-600 text-110 text-blue align-middle\">" + cart.getUser().getPhone() + "</span>\n" +
                "                            </div>\n" +
                "                            <div>\n" +
                "                                <span class=\"text-sm text-grey-m2 align-middle\">Ngày:</span>\n" +
                "                                <span class=\"text-600 text-110 text-blue align-middle\">" + dateFormat.format(date) + "</span>\n" +
                "                            </div>\n" +
                "                            <div>\n" +
                "                                <span class=\"text-sm text-grey-m2 align-middle\">Giờ:</span>\n" +
                "                                <span class=\"text-600 text-110 text-blue align-middle\">" + dateFormats.format(date) + "</span>\n" +
                "                            </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <!-- /.col -->\n" +
                "\n" +
                "                        <div class=\"table-responsive\" style=\"margin-top: 10px;\">\n" +
                "                            <h3 style=\"text-align: center;\">Chi tiết đơn hàng</h3>\n" +
                "                            <table class=\"table\">\n" +
                "                                <thead style='background-color:coral' class=\"bg-none bgc-default-tp1\">\n" +
                "                                    <tr class=\"text-white\">\n" +
                "                                        <th class=\"opacity-2\">Stt</th>\n" +
                "                                        <th>Tên sách</th>\n" +
                "                                        <th>Số lượng</th>\n" +
                "                                        <th>Giá</th>\n" +
                "                                        <th>Thành tiền</th>\n" +
                "                                       \n" +
                "                                    </tr>\n" +
                "                                </thead>\n" +
                "                                <tbody class=\"text-95 text-secondary-d3\">\n";

        for (int i = 0; i < cartDetails.size(); i++) {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setBook(cartDetails.get(i).getBook());
            cartDetail.setQuantity(cartDetails.get(i).getQuantity());
            mailContent += "<tr> <td>" + (i + 1) + "</td>" +
                    "<td>" + cartDetail.getBook().getBookName() + "</td>" +
                    "<td >" + cartDetails.get(i).getQuantity() + "</td>" +
                    "<td >" + formatter.format(Math.round(cartDetail.getBook().getPrice())) + " VNĐ " + "</td>" +
                    "<td >" + formatter.format(Math.round(cartDetail.getBook().getPrice() * cartDetails.get(i).getQuantity())) + " VNĐ " + "</td> </tr>";
        }
        mailContent += "</tbody> </table>\n" +
                "                        </div>\n" +
                "                        <div class=\"row mt-3\" style=\"margin-top:10px\">\n" +
                "                            <div class=\"col-12 col-sm-5 text-grey text-90 order-first order-sm-last\">\n" +
                "                                <div style='text-align:right' class=\"row my-2\">\n" +
                "                                    <div class=\"col-7 text-right\">\n" +
                "                                        Tổng Số Lượng : \n" + "<span style='color:red'>" + quantity + "</span>" + " Quyển" + "<br>" +
                "                                        Tổng Tiền : \n" + "<span style='color:red'>" + formatter.format(totalMoney) + "</span>" + " VNĐ" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "\n" +
                "                        <hr />\n" +
                "\n" +
                "                        <div>\n" +
                "                            <span class=\"text-secondary-d1 text-105\">Cảm ơn bạn đã mua hàng của chúng tôi </span>\n" +
                "                            <a href=\"#\" class=\"btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0\">BookHouse</a>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }
}
