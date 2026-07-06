package com.project.fitness_insights_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recommendation {
       @Id@GeneratedValue(strategy=GenerationType.UUID)
       private String id;

       //onot sure to oload the recomm alongwith the user detail
       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name="user_id",nullable = false,foreignKey = @ForeignKey(name="fk_recommendation"))
       @JsonIgnore
       private User user;

       @ManyToOne
       @JoinColumn(name="activity_id",nullable = false,foreignKey = @ForeignKey(name="fk_recommendation"))
       @JsonIgnore
       private Activity activity;

       private String type;

       @Column(length = 2500)
       private String recommendation;

       @JdbcTypeCode(SqlTypes.JSON)
       @Column(columnDefinition = "json")
       private List<String> improvements;

       @JdbcTypeCode(SqlTypes.JSON)
       @Column(columnDefinition = "json")
       private List<String> safety;

       @JdbcTypeCode(SqlTypes.JSON)
       @Column(columnDefinition = "json")
       private List<String> suggestions;

       @CreationTimestamp
       private LocalDateTime createdAt;

       @UpdateTimestamp
       private LocalDateTime updatedAt;
}
