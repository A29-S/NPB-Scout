package adroidBaseball.baseball;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface PlayerRepository extends MongoRepository<Player, ObjectId> {

    Optional<Player> findPlayerByName(String name);
    List<Player> findTeamByName(String team);
}
