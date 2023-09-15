package adroidBaseball.baseball;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="players")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
        private ObjectId id;
        private String body;

        public Review(String body) {
                this.body = body;
        }
}
