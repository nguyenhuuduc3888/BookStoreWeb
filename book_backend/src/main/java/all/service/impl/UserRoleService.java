package all.service.impl;
import all.model.UserRole;
import all.repository.UserRepository;
import all.repository.UserRoleRepository;
import all.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleService implements IUserRoleService {
    @Autowired
    UserRoleRepository userRoleRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public List<UserRole> findAll() {
        return userRoleRepository.findAll();
    }

    @Override
    public void save(UserRole userRole) {
        userRoleRepository.save(userRole.getAppRole().getId(), userRole.getUser().getId());
    }

    @Override
    public void deleteUserRole(int id) {
        userRoleRepository.deleteUserRole(id);
    }
}
