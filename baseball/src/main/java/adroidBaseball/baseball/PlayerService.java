package adroidBaseball.baseball;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
//    need Autowired to instantiate the class
    @Autowired
    private PlayerRepository playerRepository;
    public List<Player> allPlayers(){
    return playerRepository.findAll();
    }

    // For finding one player by their ID
//    public Optional<Player> onePlayer(ObjectId id){
//        return playerRepository.findById(id);
//    }

    // For finding one player by their Name
    public Optional<Player> onePlayer(String name){
        return playerRepository.findPlayerByName(name);
    }

    // for finding players by team name
    public List<Player> allPlayersByTeam(String team) {
        return playerRepository.findTeamByName(team);
    }
}
