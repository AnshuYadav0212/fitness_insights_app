### Overview
This is a full-stack monolith fintness app that enables users to securely track fitness activities, receive and store recommendation for activities, and view personalized health summaries using Spring AI.

Built the backend with Spring Boot, React, MySQL, JWT Authentication, Spring AI, and Caffeine Cache.

### Components
React -> JWT -> Spring Boot -> Spring Security -> Controllers -> Services(Spring AI + Ollama, caching AI summary with Caffeine, MySQL for database)

### Entity Relationship Diagram (ERD)

```text
                 +---------------------+
                 |        USER         |
                 +---------------------+
                 | PK id               |
                 | firstName           |
                 | lastName            |
                 | email               |
                 | password            |
                 | role                |
                 +---------------------+
                         1|
                          |      
                         *|
                 +---------------------+
                 |      ACTIVITY       |
                 +---------------------+
                 | PK id               |
                 | FK user_id          |
                 | activityType        |
                 | duration            |
                 | caloriesBurned      |
                 | activityDate        |
                 | additionalMetrics   |
                 +---------------------+
                        1 |
                          |      
                        * |
                 +---------------------+
                 |   RECOMMENDATION    |
                 +---------------------+
                 | PK id               |
                 | FK activity_id      |
                 | summary             |
                 | improvements        |
                 | suggestions         |
                 | safety              |
                 +---------------------+
```

### High Level Design

```
                     +----------------------+
                     |        User          |
                     +----------+-----------+
                                |
                                |
                                v
                     +----------------------+
                     |   React Frontend     |
                     +----------+-----------+
                                |
                       HTTPS + JWT Token
                                |
                                v
+----------------------------------------------------------+
|               Spring Boot Backend                        |
|----------------------------------------------------------|
|  Spring Security                                         |
|  JWT Authentication Filter                               |
|----------------------------------------------------------|
|  Controllers                                             |
|     UserController                                       |
|     ActivityController                                   |
|     RecommendationController                             |
|----------------------------------------------------------|
|  Services                                                |
|     UserService                                          |
|     ActivityService                                      |
|     RecommendationService                                |
|     ActivitySummaryService                               |
|----------------------------------------------------------|
|  Repositories (Spring Data JPA)                          |
+---------------------+------------------+-----------------+
                      |                  |
                      |                  |
                      v                  v
             +----------------+    +----------------+
             |     MySQL      |    | Caffeine Cache |
             +----------------+    +----------------+
                      ^
                      |
                      |
             +----------------------+
             | Spring AI + Ollama   |
             +----------------------+

```

