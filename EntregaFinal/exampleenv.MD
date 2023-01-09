# Modo administrador: false / true
ADMIN_MODE='true'

# Modo del servidor: false / true
CLUSTER_MODE='true'

# Credenciales para el cifrado de cookies y session
COOKIES_SECRET='1234567'
SESSION_SECRET='1234567'

# Link de Conexión a mongoDB Atlas (DBaaS)
MONGO_URL='mongodb+srv://Diego:lobitoysimon1@cluster0.wnejdhr.mongodb.net/?retryWrites=true&w=majority'

# Conexion MySQL / MariaDB
DB_HOST='localhost'
DB_PORT='3306'
DB_USER='root'
DB_PASS=''
DB_NAME='ecommerce'

# Tipos de persistencia posibles: 'mongoDB'
# En producción, mongo es utilizado con un cluster de Atlas.
PERSISTENCY='mongoDB'

# Cuenta emisora y receptora de mails.
GMAIL_ADMIN='tonyhaa@gmail.com'
GMAIL_PASS='kbhuowartekbjdef'

# Para enviar mensajes de WhatsApp por twilio.
TWILIO_ACCOUNT_SID='ACf1e37ac4fa268d6aa84fc013eedc8c66'
TWILIO_AUTH_TOKEN='6354a5c59a49668e4e691a4adc3c4a67'
TWILIO_PHONE='whatsapp:++14249556289'
ADMIN_PHONE='whatsapp:+5491151791994'