import freemarker.cache.ClassTemplateLoader
import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.freemarker.*
import io.ktor.html.respondHtml
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import kotlinx.html.*
import kotlinx.html.select
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.Connection

/*
fun HTML.index() {
    head {
        title("Hello from Ktor!")
    }
    body {
        div {
            +"Hello from Ktor"
        }
    }
}*/
data class UserLogin(var email: String, var password: String)
data class UserRegister(var email: String, var password: String, var passwordnew: String)

fun loginHtml(user: UserLogin) = FreeMarkerContent("login.ftl", mapOf("user" to user), "")
fun registerHtml(user: UserRegister) = FreeMarkerContent("register.ftl", mapOf("user" to user), "")
val mapDatabase = Database.connect("jdbc:sqlite:map.sqlite", "org.sqlite.JDBC")


fun main() {
    val client = HttpClient(CIO)
    TransactionManager.manager.defaultIsolationLevel = Connection.TRANSACTION_SERIALIZABLE
    transaction(mapDatabase) {
        SchemaUtils.create(Users)

    }
    embeddedServer(Netty, port = 8080, host = "127.0.0.1") {
        install(FreeMarker) {
            templateLoader = ClassTemplateLoader(this::class.java.classLoader, "templates")
        }
        routing {
            static("/static") {
                resources("static")
            }
            get("/") {

                call.request.cookies.get("userEmail")?.let {
                    call.respond(FreeMarkerContent("session.ftl", mapOf("" to "")))
                } ?: call.respond(FreeMarkerContent("main.ftl", mapOf("" to ""), ""))
            }
            route("/login") {
                get() {
                    call.respond(loginHtml(UserLogin("", "")))
                }
                post {
                    val a = call.receiveParameters()
                    val user = UserLogin(a["email"]!!, a["password"]!!)
                    val x = transaction(mapDatabase) {
                        return@transaction Users.select { Users.email eq user.email }.map { it[Users.password] }
                    }
                    if (x.any { it == user.password }) {
                        call.response.cookies.append("userEmail", user.email)
                        call.respondRedirect("/", permanent = false)
                    } else {
                        call.respond(loginHtml(user))
                    }
                }
            }
            get("support") {
                call.respond(FreeMarkerContent("support.ftl", mapOf("" to "")))
            }
            route("register") {
                get {
                    call.respond(registerHtml(UserRegister("", "", "")))
                }
                post {
                    val a = call.receiveParameters()
                    val user = UserRegister(a["email"]!!, a["password"]!!, a["password2"]!!)
                    if (user.password == user.passwordnew) {
                        try {
                            transaction(mapDatabase) {
                                Users.insert {
                                    it[email] = user.email
                                    it[password] = user.password
                                }
                            }
                        } catch (e: Exception) {
                            println(e.message)
                        }
                        call.response.cookies.append("userEmail", user.email)
                        call.respondRedirect("/session", permanent = false)

                    } else {
                        call.respond(registerHtml(user))
                    }
                }
            }
            get("/getAddress/lat={lat}/lng={lng}"){
                val lat= call.parameters["lat"]
                val lng = call.parameters["lng"]
                call.respond( client.get<String>("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}" ) )
            }
            get("/session") {
                call.respond("eeeeeeeee")
            }
        }
    }.start(wait = true)
}