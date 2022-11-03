package all.dto;

import java.util.List;

public class CartDto {
    private Integer id;
    private String createDate;
    private String createTime;
    private List<CartDetailDto> cartDetails;

    public CartDto() {
    }

    public CartDto(Integer id, String createDate, String createTime) {
        this.id = id;
        this.createDate = createDate;
        this.createTime = createTime;
    }

    public CartDto(Integer id, String createDate, String creatTime, List<CartDetailDto> cartDetails) {
        this.id = id;
        this.createDate = createDate;
        this.cartDetails = cartDetails;
        this.createTime = creatTime;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String creatTime) {
        this.createTime = creatTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public List<CartDetailDto> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(List<CartDetailDto> cartDetails) {
        this.cartDetails = cartDetails;
    }
}
