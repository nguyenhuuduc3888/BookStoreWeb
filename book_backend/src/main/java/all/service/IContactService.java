package all.service;

import all.model.Book;
import all.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IContactService {
    Page<Contact> finAll(Pageable pageable);

    Contact finById(int id);

    void save(Contact contact);

    void delete(int id);
}
