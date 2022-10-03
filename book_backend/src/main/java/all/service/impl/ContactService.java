package all.service.impl;

import all.model.Contact;
import all.repository.IContactRepository;
import all.service.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ContactService implements IContactService {
    @Autowired
    IContactRepository contactRepository;

    @Override
    public Page<Contact> finAll(Pageable pageable) {
        return contactRepository.finAllContact(pageable);
    }

    @Override
    public Contact finById(int id) {
        return contactRepository.finById(id);
    }

    @Override
    public void save(Contact contact) {
        contactRepository.save(contact);
    }

    @Override
    public void delete(int id) {
        contactRepository.deleteContact(id);
    }
}
