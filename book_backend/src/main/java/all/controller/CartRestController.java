package all.controller;

import all.model.Cart;
import all.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/cart")
public class CartRestController {

    @Autowired
    private ICartService cardService;

    @PostMapping("card/create")
    public ResponseEntity<?> save(@RequestBody @Valid Cart card) {
        cardService.save(card);
        return new ResponseEntity<>(HttpStatus.OK);

    }
}
