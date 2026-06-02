from connection import get_db_connection

def query_function(func):
    def decorator(*args, **kwargs):
        conn = get_db_connection()

        try:
            result = func(conn, *args, **kwargs)
            return result

        except Exception as e:
            print("DATABASE ERROR:", e)
            raise e

        finally:
            conn.close()

    return decorator