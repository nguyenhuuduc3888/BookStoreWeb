package all.service.impl;

import all.model.Category;
import all.repository.ICategoryRepository;
import all.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    ICategoryRepository categoryRepository;

    @Override
    public List<Category> getList() {
        return categoryRepository.findAll();
    }
}
