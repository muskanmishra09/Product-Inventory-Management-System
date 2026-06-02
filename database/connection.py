import psycopg2
from configparser import ConfigParser

def config(filename="database/database.ini", section="postgresql"):
    parser = ConfigParser()
    parser.read(filename)
    db = {}

    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(f"Section {section} is not found in the {filename} file.")
    
    return db

def get_db_connection():
    data = config()

    print("DB CONFIG:", data)

    conn = psycopg2.connect(**data)

    cur = conn.cursor()
    cur.execute("SELECT current_database();")
    print("DATABASE:", cur.fetchone())

    cur.execute("SHOW port;")
    print("PORT:", cur.fetchone())

    cur.execute("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
    """)
    print("TABLES:", cur.fetchall())

    return conn

