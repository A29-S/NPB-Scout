package adroidBaseball.baseball;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
@Document(collection="players")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    @Id
    private ObjectId id;
    private String name;
    private int age;
    private int g;
    private int pa;
    private int ab;
    private int r;
    private int h;
    private int doubles;
    private int triples;
    private int hr;
    private int rbi;
    private int sb;
    private int cs;
    private int bb;
    private int so;
    private double ba;
    private double obp;
    private double slg;
    private double ops;
    private int tb;
    private int gdp;
    private int hbp;
    private int sh;
    private int sf;
    private int ibb;
    public String team;
//    private String review;

    @DocumentReference
    private List<Review> review;


}