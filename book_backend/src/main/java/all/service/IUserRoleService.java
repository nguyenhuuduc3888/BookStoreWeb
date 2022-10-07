package all.service;
import all.model.UserRole;
import java.util.List;

public interface IUserRoleService {
    List<UserRole> findAll();
    void save(UserRole userRole);
    void deleteUserRole(int id);

}
