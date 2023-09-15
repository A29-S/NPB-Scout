package adroidBaseball.baseball;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/players")
public class playerController {
    @Autowired
    private PlayerService playerService;
    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers(){
        return new ResponseEntity<List<Player>>(playerService.allPlayers(), HttpStatus.OK);
    }

//     For finding one player by their ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<Player>> getOnePlayer(@PathVariable ObjectId id){
//        return new ResponseEntity<Optional<Player>>(playerService.onePlayer(id), HttpStatus.OK);
//    }

    // For finding one player by their Team
    @GetMapping("/{name}")
    public ResponseEntity<Optional<Player>> getOnePlayer(@PathVariable String name){
        return new ResponseEntity<Optional<Player>>(playerService.onePlayer(name), HttpStatus.OK);
    }

    @GetMapping("/team/{team}")
    public ResponseEntity<List<Player>> getPlayersByTeam(@PathVariable String team) {
        List<Player> allPlayers = playerService.allPlayers();
        List<Player> filteredPlayers = allPlayers.stream()
                .filter(player -> team.equals(player.team))// Adjust the condition based on your entity structure
                .collect(Collectors.toList());

        return new ResponseEntity<>(filteredPlayers, HttpStatus.OK);
    }

}
