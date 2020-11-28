import org.jetbrains.exposed.sql.Table

object Users : Table(){
        val email  = text( "name" )
        val password  = text ( "password"  )
        override val primaryKey = PrimaryKey(email)
}

object Markers : Table(){
    val userName = text("userName" ) references Users.email
    val latitude =  double("latitude")
    val longitude = double("longitude" )
    val description = text("description")
    override val primaryKey = PrimaryKey(
        userName,
        latitude,
        longitude
        )
    }

object Polygones :Table() {
    val id = integer("id").autoIncrement()
    val userName = varchar("userName", 50) references Users.email
    val description = varchar("description", 1000)
    override val primaryKey = PrimaryKey(
        id,
        userName
    )
}
object PolygonePoints : Table(){
        var id = integer("id") references Polygones.id
        val latitude = double("latitude")
        val longitude = double("longitude")
        override val primaryKey = PrimaryKey(
                id,
                latitude,
                longitude
        )
    }





