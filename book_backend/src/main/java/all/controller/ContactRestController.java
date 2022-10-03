package all.controller;

import all.model.Book;
import all.model.Contact;
import all.service.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/contact")
public class ContactRestController {
    @Autowired
    IContactService contactService;

    @GetMapping("/page")
    public ResponseEntity<Page<Contact>> finAll(@PageableDefault(value = 6) Pageable pageable) {
        Page<Contact> contactPage = contactService.finAll(pageable);
        if (contactPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contactPage, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Contact> detail(@PathVariable int id) {
        Contact contact = contactService.finById(id);
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Contact> create(@RequestBody Contact contact) {
        contact.setIsDeleted(false);
        contactService.save(contact);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Contact> delete(@PathVariable int id) {
        contactService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
