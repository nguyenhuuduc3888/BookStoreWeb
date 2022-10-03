package all.repository;

import all.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface IContactRepository extends JpaRepository<Contact, Integer> {
    @Query(value = "select * from contact where is_deleted = 0 order by id desc", nativeQuery = true)
    Page<Contact> finAllContact(Pageable pageable);

    @Query(value = "select *from contact where id =:id", nativeQuery = true)
    Contact finById(@Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "update contact set is_deleted =1 where id =:id", nativeQuery = true)
    void deleteContact(@Param("id") int id);
}
